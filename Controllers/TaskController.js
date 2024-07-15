import { errorHandler } from "../Utils/Error.js";
import User from "../Models/UserSchema.js";
import Task from "../Models/TaskSchema.js";
import Projects from "../Models/ProjectsSchema.js";
//Create Task
export const createTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const projectId = req.params.projectId;
        const project = await Projects.findById(projectId);
        //console.log(project);
      if (!project) {
        return res.status(404).json({ message: "Project Not Found" });
      }
      const { title,category , description } = req.body;
      if (!title || !description || !category) {
        return next(errorHandler(400, "All the Fields Are Required"));
      }
      const newTask = new Task({
        title,
        description,
        category,
        status: "pending",
        user: id,
      });
      // create new Task
      await newTask.save();
      //updating in user data
      const user = await User.findById(id);
      user.taskPending.push(newTask._id);
      await user.save();
      //updating in project data
      project.tasks.push(newTask._id);
      await project.save();
      //response
      res.status(200).json({ Message: "Task Created Successfully" });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  };

  //get all task
  export const getalltask = async (req, res, next) => {
    try {
      const tasks = await Task.find();
      res.status(200).json({ Message: "All Tasks", tasks });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  };

  //get user task
  export const gettaskbyid = async (req, res, next) => {
    try {
      const tasks = await Task.find({ user: req.params.id });
  
      if (!tasks) {
        return res.status(404).json({ Message: "No tasks found for this user" });
      }
  
      res.status(200).json({ Message: "Tasks Found", tasks });
    } catch (error) {
      return next(error); 
    }
  };

  //update task Status by id

  export const updateTaskStatus = async (req, res, next) => {
    const {userID,taskID} = req.params;
    try {
        const user = await User.findById(userID);
       if (!user) {
        return res.status(404).json({ Message: "User with pending task not found" });
      }
      //console.log(user);
      const task = await Task.findById(taskID);
      if (!task) {
        return res.status(404).json({ Message: "Task Not Found" });
      }
      task.status = req.body.status;
      await task.save();
      user.taskPending = user.taskPending.filter(taskid => taskid.toString() !== taskID);
      user.taskCompleted.push(taskID); 
     await user.save();
  
      res.status(200).json({ Message: "Task Status Updated Successfully" }); 
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  };

  //get PM task
  export const getPMTask = async (req, res, next) => {
    try {
      const projects = await Projects.find({ projectManager: req.params.id });

      if (!projects || projects.length === 0) {
        return res.status(404).json({ message: "No projects found for this project manager" });
      }
      const taskIds = [];
      projects.forEach(project => {
        if (project.tasks) {
          taskIds.push(...project.tasks);
        }
      });
      const tasks = await Task.find({ _id: { $in: taskIds } });
      res.status(200).json({ message: "Tasks found", tasks });
    } catch (error) {
      return next(error);
    }
  };

  //get project tasks
  export const getProjectTasks = async (req, res, next) => {
      try {
        const projects = await Projects.findById(req.params.id);
    if (!projects.tasks) {
      return res.status(404).json({ message: "No tasks found for this project" });
    }
    const tasks = await Task.find({ _id: { $in: projects.tasks } });
        res.status(200).json({ message: "Tasks found", tasks });
      } catch (error) {
        return next(errorHandler(500, error.message));
      }
    };
  
  
