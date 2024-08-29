import mongoose, { Schema } from "mongoose";

const authSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic :{
        type: Schema.Types.ObjectId,
        ref: "ProfilePic" 
    }
}, {timestamps: true})

export const User = mongoose.model("User", authSchema)