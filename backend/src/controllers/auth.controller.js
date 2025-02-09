import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res)=>{
    try {
        const {fullName, email, password} = req.body;
        if(!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }else{
            //finding if a user already exists with this email
            const user = await User.findOne({email});
     
            
            if(user){
               return res.status(400).json({message: "Email already exists"});
            }else{
                //hasing user Password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const newUser = await User.create({fullName, email, password: hashedPassword});
               
                if(newUser){
                    generateToken(newUser._id, res);
                    return res.status(201).json({
                        __id: newUser._id,
                        fullName: newUser.fullName,
                        email: newUser.email,
                        profilePic: newUser.profilePic
                    })
                }else{
                    return res.status(500).json({message: "Failed to create user"});
                }
            }
            
        }

    } catch (error) {
        console.log("error in signup controller", error);
        res.status(500).json({message: "internal server error"});
        
    }
}
export const login = async (req, res)=>{
   try {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "All fields are required"});
    }

    const findUserbyEmail = await User.findOne({email});
    if(!findUserbyEmail){
        return res.status(400).json({message: "Invalid Credentials"});
    }

    const isPasswordCorrect = await bcrypt.compare(password, findUserbyEmail.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Invalid Credentials"});
    }else{
        generateToken(findUserbyEmail._id, res);
        return res.status(200).json({
            __id: findUserbyEmail._id,
            fullName: findUserbyEmail.fullName,
            email: findUserbyEmail.email,
            profilePic: findUserbyEmail.profilePic
        });
    }
   } catch (error) {
      console.log("error in login controller", error);
      res.status(500).json({message: "internal server error"});
      
   }

}
export const logout = async(req, res)=>{
     try {
        res.cookie("jwt", "", {maxAge:0});
        return res.status(200).json({message: "Logged out successfully"});
     } catch (error) {
        console.log("error in logout controller", error);
        return res.status(500).json({message: "internal server error"});
        
     }
}

export const updateProfile = async(req, res)=>{
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;
        
        

        if(!profilePic){
            return res.status(400).json({message: "Profile picture is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
       
        
        

        const updateUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true});
           
        return res.status(200).json(updateUser);

    } catch (error) {
       console.log("error in update profile controller", error);
         res.status(500).json({message: "internal server error"});
        
    }
}

export const checkAuth = (req, res)=>{
    try {
          res.status(200).json(req.user)
    } catch (error) {
        console.log("error in check auth controller", error);
        res.status(500).json({message: "internal server error"});
        
    }
}