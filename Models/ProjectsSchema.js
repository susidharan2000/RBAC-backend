import  mongoose from "mongoose";
const projects_Schema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    projectManager:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    team:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User",
    },
    tasks:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Task",
    },
    status:{
        type:String,
        default:"pending",
        required:true
    }
},{timestamps:true});
const Projects = mongoose.model("Projects",projects_Schema);

export default Projects;