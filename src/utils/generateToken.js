import jwt from "jsonwebtoken"

const generateToken = (userId, res) => {
    const token =  jwt.sign( {userId}, process.env.JSON_TOKEN_SECRET, { expiresIn: '1h' });
 
    res.cookie("jwt", token, {
        maxage: 60 * 60 * 1000,
        httpOnly : true,
        sameSite: 'None',       // Allows the cookie to be sent with cross-origin requests
        secure: true, 
    })
}


export {generateToken}