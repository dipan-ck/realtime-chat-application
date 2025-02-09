import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

 const protectRoute = async(req, res, next)=>{
    const token  = req.cookies.jwt;
    

    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }
    
    try {
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        if(!decode){
            return res.status(401).json({message: "Invalid Token"});
        }else{
            const user = await User.findById(decode.userId).select("-password");
            if(!user){
                return res.status(400).json({message: "User not found"})
            }else{
                req.user = user;
                next();
            }
        }
    } catch (error) {
        console.log("error in auth middleware");
        res.status(401).json({message: "internal server error"});
        
    }
}

export default protectRoute;