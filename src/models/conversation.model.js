import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
    users:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: []
    }]
}, {timestamps: true})


export const Conversation = mongoose.model("Conversation", conversationSchema)