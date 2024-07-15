import { errorHandler } from "../Utils/Error.js";
import Projects from "../Models/ProjectsSchema.js";
import User from "../Models/UserSchema.js";
//create a new project
export const CreateProject = async(req,res,next)=>{
    const {title, description,projectManager,team} = req.body;
    if (!title ||!description ||!projectManager || !team) {
        return next(errorHandler(400, "All Fields are Required"));
    }
    const projectmanager = await User.findById(projectManager);
    if(!projectmanager) {
        return next(errorHandler(400, "Invalid Project Manager"));
    }
    console.log(projectManager);
    try {
        const newProject = new Projects({
            title: title,
            description: description,
            projectManager: projectManager,
            team:team,
            status: "Pending",
        });
        const project = await newProject.save();
        res.status(201).json({message:"Project created successfully",project});
    } catch (error) {
        return errorHandler(500, error.message);
    }
}

//get project

export const getProject = async (req, res,next) =>{
    try{
        const project = await Projects.find();
        if(!project){
            return res.status(404).json({message:"Project Not Found"});
        }
        res.status(200).json({message:"Project Found",project});
    }
    catch(error){
        return next(errorHandler(500,error.message));
    }
}
//get PM's project
export const getPMProjects = async (req, res, next) => {
    try {
        const id = req.params.id;
        const projects = await Projects.find({ projectManager: id });
        if (projects.length === 0) {
            return res.status(404).json({ message: "No Projects Found" });
        }
        res.status(200).json({ message: "Projects Found", projects });
    } catch (error) {
        return next(errorHandler(500, error.message));
    }
}
//get team projects

export const getTeamProjects = async (req, res, next) => {
    try {
        const projectid = req.params.id;
        const projects = await Projects.findById(projectid);

        if (!projects) {
            return res.status(404).json({ message: "Project Not Found" });
        }
        const users = await User.find();
        const filteredMembers = [];
        projects.team.forEach(teamMemberId => {
            const user = users.find(user => user._id.toString() === teamMemberId.toString());
            /* console.log(user); */
            if (user) {
                filteredMembers.push(user);
            }
        });

        return res.status(200).json({message:"team",team:filteredMembers});
    } catch (error) {
        return next(errorHandler(500, error.message));
    }
}

//get member team
export const getMemberTeam = async(req,res,next) =>{
    try{
        const id = req.params.id;
        const project = await Projects.find({ team: { $in: id } });
        return res.status(200).json({message:"my project",projects:project[0]});
    }
    catch(error){
        return next(errorHandler(500,error.message));
    }
}
