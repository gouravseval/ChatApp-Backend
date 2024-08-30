import { User } from "../models/auth.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
const protectRoute = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt
    if (!token) throw new apiError(400, "unauthorized : no token provided")

    const decoded = jwt.verify(token, process.env.JSON_TOKEN_SECRET)

    if (!decoded) throw new apiError(400, "Unauthorized : invalid token")
    const user = await User.findById(decoded.userId).select("-password")
 
    req.user = user

    next()
})

export { protectRoute }