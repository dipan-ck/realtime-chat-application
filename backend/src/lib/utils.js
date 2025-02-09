import jwt from "jsonwebtoken";

export const generateToken =(userId, res)=>{
    // generate a token with the user id and secret key
    const token = jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    })
   
    return token;
}