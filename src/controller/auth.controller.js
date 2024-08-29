import { User } from "../models/auth.model.js"
import { apiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js"

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if ([username, email, password].some((field) => field?.trim() === "")) {
        throw new apiError(400, "All fields are required")
    }

    const user = await User.findOne({ email })

    if (user) {
        throw new apiError(404, 'User already exist')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    User.create({
        username, email, password: hashedPassword
    })

    res.status(200).json(new ApiResponse(200, {}, "user created successfully"))
})


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if ([email, password].some((field) => field?.trim === "")) {
        throw new apiError(400, "Email and password is required")
    }

    const user = await User.findOne({ email }) 

    if (!user) {
        throw new apiError(400, "Email or password is not correct")
    }

    const comparePassword = await bcrypt.compare(password, user.password)
    
    if (!comparePassword) {
        throw new ApiResponse(400, "Email or username is correct")
    }

    generateToken(user._id, res)

    res.status(200).json({
        id: user._id,
        username: user.username,
    })

})

const logout = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {maxage: 0})
    res.status(200).json("logged out successfully")
})

export { register, login, logout }