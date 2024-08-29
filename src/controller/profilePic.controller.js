import { User } from "../models/auth.model.js";
import { ProfilePic } from "../models/profilepic.model.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadImage } from "../utils/cloudinary.js";

const uploadPic = asyncHandler(async (req, res) => {
    const id = req.user._id
    const profilePicPath = req.file?.path;

    if (!id || !profilePicPath) {
        throw new apiError(400, "Invalid request: Missing ID or Profile Picture");
    }


    const profilePicUrl = await uploadImage(profilePicPath);
    const profilePicUrlString = profilePicUrl?.url || null;

    if (!profilePicUrlString) {
        throw new apiError(500, "Image upload failed");
    }


    const prevPic = await ProfilePic.findOne({ user: id });

    if (prevPic) {
        const newProfilePic = await ProfilePic.findOneAndUpdate(
            { user: id },
            { profilePic: profilePicUrlString }
        );
        
        await User.findByIdAndUpdate(id, {
            profilePic: newProfilePic._id,
        });

        return res.status(200).json(new ApiResponse(200, {}, "Profile picture updated successfully"));
    }


    const newProfilePic = await ProfilePic.create({
        user: id,
        profilePic: profilePicUrlString,
    });


    await User.findByIdAndUpdate(id, {
        profilePic: newProfilePic._id,
    });

    res.status(201).json(new ApiResponse(201, {}, "Profile picture uploaded successfully"));
});


const fetchProfilePic = asyncHandler(async (req, res) => {
    const id = req.user._id
    if (!id) {
        throw new apiError(400, "No id found")
    }

    const userPic = await ProfilePic.findOne({
        user: id
    })

    res.status(200).json(new ApiResponse(200, userPic, "success"))
})


export { uploadPic, fetchProfilePic }