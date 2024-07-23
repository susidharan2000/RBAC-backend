import Chat from "../Models/ChatSchema.js";
import User from "../Models/UserSchema.js";
import Message from "../Models/MessageSchema.js";
import { errorHandler } from "../Utils/Error.js";

// sending messages
export const SendMessage = async (req, res, next) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        return res.status(400).send({ message: "Please fill all fields" });
    }
    var newMessage = {
        sender: req.user.id,
        content: content,
        chat: chatId
    };
    try {
        var message = await Message.create(newMessage);
        message = await message.populate("sender", "username profilePic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "username email profilePic"
        });
        const chat = await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });
        res.status(200).send(message);
    } catch (error) {
        return errorHandler(500, error.message);
    }
};

// get all messages

export const getAllMessages =async(req,res,next) =>{
    try{
        const messages = await Message.find({chat: req.params.chatId}).populate("sender", "username profilePic").populate("chat");
        res.status(200).json({message:"messages",messages});
    }
    catch(error){
        return errorHandler(500,error.message);
    }
}
