import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoDB_URL =  process.env.MONGODB_URL;

const ConnectDB = async(req,res)=>{
    try{
        //console.log(MongoDB_URL);
        const connection = await mongoose.connect(MongoDB_URL);
        console.log("MongoDB Connected Successfully");
        // return connection;
    }
    catch(error){
        console.log(error);
        res.status(500).json({Message:"Mongodb Connection Error"});
    }
}

export default ConnectDB;