import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8
    }  ,
    profilePicture:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

},{ timestamps: true })

const User = mongoose.model("User",UserSchema)
export default User;