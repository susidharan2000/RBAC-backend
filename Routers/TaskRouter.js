import express from "express";
import { createTask, getalltask, gettaskbyid, updateTaskStatus } from "../Controllers/TaskController.js";
import { AdminAccess } from "../Middleware/AdminAccess.js";


const router = express.Router();

router.post('/create-task/:id',AdminAccess,createTask);
router.get('/getalltask',AdminAccess,getalltask);
router.get('/getusertask/:id',gettaskbyid);

router.put('/update-status/:userID/:taskID',updateTaskStatus);
export default router;