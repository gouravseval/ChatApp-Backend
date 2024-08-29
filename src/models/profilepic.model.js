import mongoose, { Schema } from "mongoose";

const profilePicSchema = new Schema({
    profilePic: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    
}, {timestamps: true})

export const ProfilePic = mongoose.model("ProfilePic", profilePicSchema) 