import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    senderId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        requied: true
    },
    recieverId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        requied: true
    },
    message:{
        type: String,
        requied: true
    },
}, {timestamps: true})


export const Message = mongoose.model("Message", messageSchema)