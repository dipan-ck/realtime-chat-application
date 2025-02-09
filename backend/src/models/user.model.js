import mongoose from "mongoose";


const {Schema, model}= mongoose;

const userSchema = new Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        required:true,
        type: String,
        unique:true
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
    },
    profilePic:{
        type:String,
        default: "",

    }
}, {timestamps: true});

const User = model("User", userSchema);

export default User;