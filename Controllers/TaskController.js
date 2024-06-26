import { errorHandler } from "../Utils/Error.js";
import User from "../Models/UserSchema.js";
import Task from "../Models/TaskSchema.js";
//Create Task
export const createTask = async (req, res, next) => {
    try {
        const id = req.params.id;
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