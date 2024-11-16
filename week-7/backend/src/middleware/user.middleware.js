import mongoose from 'mongoose'; 
import jwt from "jsonwebtoken";
import getUserModelForBatch from "../models/user.model.js";

const protectRoute = async(req,res,next) => {
    try {
        const token = req.cookies.token;
        //console.log("Incoming Cookies in Protect Middleware:", req.cookies);
        if(!token) {
            return res.status(401).json({ error : "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log("Decoded JWT:", decoded);

        if(!decoded) {
            return res.status(401).json({ error : "Unauthorized - Invalid token" });
        }

          // Convert userId to ObjectId if it's a string
         //const userId = new mongoose.Types.ObjectId(decoded.userId);

          //console.log("UserId converted to ObjectId:", userId);

          // Log batchnumber to ensure it's correct
          //console.log("Batch Number from JWT:", decoded.batchnumber);
        
        //Get user model based on decoded batch number

        //const userId = new  mongoose.Types.ObjectId(decoded.userId);
        //console.log("Decoded userId:", userId);

        const UserModel = getUserModelForBatch(decoded.batchnumber);
        //console.log("Using Model:", UserModel.modelName);

        //find user by decoded userId
        const user = await UserModel.findById(decoded.userId).select("-password");

        //console.log("User found:", user);

        if(!user) {
            return res.status(404).json({ error : "User not found" });
        }

        req.user = user;
        next();

    } catch(error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({ error : "Internal Server Error" });
    }
};

export default protectRoute;