import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import {io} from "../lib/socket.js";

export const getUsersforSidebar = async(req, res)=>{
   try {
   
    
     const loggedinUserId = req.user._id;
     const filteredUsers = await User.find({ _id: { $ne: loggedinUserId } }).select("-password");
     res.status(200).json(filteredUsers);
   } catch (error) {
       console.log("error in getUsersforSidebar controller", error);
       res.status(500).json({message: "internal server error"});
       
   }
}

export const getMessages = async(req, res)=>{
    try {
        const userToChatId = req.params.id;
        const myId = req.user._id;

        const messages = await Message.find({
           $or:[
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId }
           ]
        })

        res.status(200).json(messages);
    } catch (error) {
          console.log("error in getMessages controller", error);
          res.status(500).json({message: "internal server error"});
          
    }
}

export const sendMessage = async (req, res)=>{
    try {
        const receiverId = req.params.id;
        const senderId = req.user._id;

        const {text, image} = req.body;
          let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
             imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            senderId: senderId,
            receiverId: receiverId,
            text: text,
            image: imageUrl
        });

        //realTime socket io
          
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }


        res.status(201).json(newMessage);


    } catch (error) {
        console.log("error in sendMessage controller", error);
        return res.status(500).json({message: "internal server error"});
        
    }
}