import  mongoose from "mongoose";
const chat_Schema = mongoose.Schema({
    chatName:{
        type:String,
        trim:true,
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
                ref:"User"
    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    groupAdmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    
},{timestamps:true});
const Chat = mongoose.model("Chat",chat_Schema);

export default Chat;