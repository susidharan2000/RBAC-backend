import  mongoose from "mongoose";
const message_Schema = mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    content:{
        type:String,
        trim:true,
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat",
    }
},{timestamps:true});
const Message = mongoose.model("Message",message_Schema);

export default Message;