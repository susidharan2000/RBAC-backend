import  mongoose from "mongoose";
const task_Schema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
    
},{timestamps:true});
const Task = mongoose.model("Task",task_Schema);

export default Task;