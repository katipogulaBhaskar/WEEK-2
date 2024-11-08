import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true,
    },
    role : {
        type : String,
        enum : ['patient', 'provider'], 
        required : true
    },
}, { timestamps: true})

const User = mongoose.model("User", userSchema);

export default User;
