import Chat from "../Models/ChatSchema.js";
import User from "../Models/UserSchema.js";
import { errorHandler } from "../Utils/Error.js";
export const accessChat = async(req,res,next)=>{
    //console.log(req.user.id);
    const {userId} = req.body;
    if(!userId){
        console.log("userId parameter not send");
        return res.status(400);
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and:[
            {users:{$elemMatch:{$eq:req.user.id}}},
            {users:{$elemMatch:{$eq:userId}}}
        ]
    }).populate("users","-password -phonenumber -experiance -address -gender -taskCompleted -taskPending").populate("latestMessage");
    //console.log(isChat);
    var isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"username profilePic email"
    });
    //console.log(isChat);
    if(isChat.length > 0){
        res.status(200).json({success:true,chat:isChat[0]});
    }else{
        var ChatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user.id, userId],
        }
        try {
            const createdChat = await Chat.create(ChatData);
            const fullChat = await Chat.findOne({_id: createdChat._id}).populate(
                "users",
                "-password"
            );
            res.status(200).json({success:true,chat:fullChat});
        } catch (error) {
            return next(errorHandler(500,error.message));
        }
    }
}

//get chat data
export const fetchChat = async(req,res,next)=>{
    try {
        const chats= await Chat.find({users:{$elemMatch:{$eq:req.user.id}}}).populate("users","-password -phonenumber -experiance -address -gender -taskCompleted -taskPending").populate("latestMessage")
        .sort({updatedAt:-1})
        .then(async(results)=>{
            results = await User.populate(results,{
                path:"latestMessage.sender",
                 select:"username profilePic email"
            });
            res.status(200).send(results);
        })
    } catch (error) {
        return next(errorHandler(500,error.message));
    }
}

//get the chat by Id

export const fetchChatById = async(req,res,next)=>{
    const id = req.params.id
    try {
        const chats= await Chat.findById(id).populate("users","-password -phonenumber -experiance -address -gender -taskCompleted -taskPending").populate("latestMessage")
        .sort({updatedAt:-1})
        .then(async(results)=>{
            results = await User.populate(results,{
                path:"latestMessage.sender",
                 select:"username profilePic email"
            });
            res.status(200).send(results);
        })
    } catch (error) {
        return next(errorHandler(500,error.message));
    }
}

//create group chat 
export const createGroupChat = async(req,res,next)=>{
    if(!req.body.users || !req.body.name){
        return res.status(400).send({message:"Please fill all fields"});
    }
    var users = JSON.parse(req.body.users);
    if(users.length < 2){
        return res.status(400).send({message:"Atleast two users are required to create a group chat"});
    }
    users.push(req.user.id);
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user.id
        });
        const fullgroupChat = await Chat.findOne({_id: groupChat._id})
        .populate("users","-password -phonenumber -experiance -address -gender -taskCompleted -taskPending").
        populate("groupAdmin","-password -phonenumber -experiance -address -gender -taskCompleted -taskPending");
        res.status(200).send(fullgroupChat);
    } catch (error) {
        return next(errorHandler(500,error.message));
    }
}

//rename a group 
export const renameGroup = async(req,res,next)=>{
    const {chatName,chatId} = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName:chatName
        },
        {
            new:true
        }
    ).populate("users","-password -phonenumber -experiance -address -gender -taskCompleted -taskPending").
    populate("groupAdmin","-password -phonenumber -experiance -address -gender -taskCompleted -taskPending");
    if(!updatedChat){
        res.status(404);
        return next(errorHandler(500,error.message));
    }
    else{
        res.status(200).json(updatedChat);
    }
}

// add to group
export const addToGroup = async(req,res,next)=>{
    const {userId,chatId} = req.body;
    const added = await Chat.findByIdAndUpdate(
        chatId,
                {
                    $push: {users: userId}
                },
                {
                    new:true
                }
    ).populate("users","-password -phonenumber -experiance -address -gender -taskCompleted -taskPending").
    populate("groupAdmin","-password -phonenumber -experiance -address -gender -taskCompleted -taskPending");
    if(!added){
        res.status(404);
        throw new Error("Chat not found");
    }
    else{
        res.status(200).json({message:"user Added",added});
    }
}

// remove from group
export const removefromGroup = async(req,res,next)=>{
    const {userId,chatId} = req.body;
    console.log(userId,chatId);
    // Validate input
    if (!userId || !chatId) {
        return res.status(400).json({ message: "User ID and Chat ID are required." });
    }
    const removed = await Chat.findByIdAndUpdate(
        chatId,
                {
                    $pull: {users: userId}
                },
                {
                    new:true
                }
    ).populate("users","-password -phonenumber -experiance -address -gender -taskCompleted -taskPending").
    populate("groupAdmin","-password -phonenumber -experiance -address -gender -taskCompleted -taskPending");
    if(!removed){
        res.status(404);
        throw new Error("Chat not found");
    }
    else{
        res.status(200).json({message:"user Removed",removed});
    }
}