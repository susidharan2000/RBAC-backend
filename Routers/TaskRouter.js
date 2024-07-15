import express from "express";
import { createTask, getalltask, getPMTask, getProjectTasks, gettaskbyid, updateTaskStatus } from "../Controllers/TaskController.js";
import { PMAccess } from "../Middleware/PMAccess.js";


const router = express.Router();

router.post('/create-task/:id/:projectId',PMAccess,createTask);
router.get('/getalltask',PMAccess,getalltask);
router.get('/getusertask/:id',gettaskbyid);

router.put('/update-status/:userID/:taskID',updateTaskStatus);
router.get('/getPMTask/:id',PMAccess,getPMTask);
router.get('/getprojecttask/:id',PMAccess,getProjectTasks);
export default router;