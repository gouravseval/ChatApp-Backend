import { User } from "../models/auth.model.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const fetchUsers = asyncHandler(async (req, res) => {
    const loggedInUserId = req.user._id;

    // Find users excluding the logged-in user and populate the  field
    const users = await User.find({ _id: { $ne: loggedInUserId } })
        .select("-password -email").populate("profilePic")


    if (!users || users.length === 0) {
        throw new apiError(200, [], "No user found");
    }

    res.status(200).json(new ApiResponse(200, users));
});

export { fetchUsers }