import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectToDB = async() => {

    try {
        await mongoose.connect( process.env.DBCONNECT );
        console.log("Database Connected ");

    } catch(error) {
        console.error("ERROR in connection!!", error);
    }
};

export default connectToDB;