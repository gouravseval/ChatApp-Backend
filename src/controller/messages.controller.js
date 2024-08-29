import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const messageSend = asyncHandler(async (req, res) => {
    const { message } = req.body
    const receiverId = req.params.id
    const senderId = req.user._id

    let conversation = await Conversation.findOne({
        users: { $all: [senderId, receiverId] }
    })

    if (!conversation) {
        await Conversation.create({
            users: [receiverId, senderId]
        })

        conversation = await Conversation.findOne({
            users: { $all: [senderId, receiverId] }
        })
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        message
    })
    

    if (newMessage) {
        conversation.messages.push(newMessage._id)
    }

    await Promise.all([conversation.save(), newMessage.save()])
    // socket io 
    const socketReceiverId = getReceiverSocketId(receiverId)
    if (receiverId) {
        io.to(socketReceiverId).emit("newMessage", newMessage)
    }


    res.status(200).json(new ApiResponse(200, {}))

})

const getMessage = asyncHandler(async (req, res) => {
    const { id } = req.params
    const senderId = req.user._id

    if ([id, senderId].some((field) => field?.toString()?.trim() === "")) {
        throw new apiError("All fields are required")
    }

    const conversation = await Conversation.findOne({
        users: { $all: [id, senderId] }
    }).populate("messages")

    if (!conversation) return res.status(200).json(new ApiResponse(200, []))

    res.status(200).json(new ApiResponse(200, conversation, "message sent successfully"))


})

export { messageSend, getMessage }