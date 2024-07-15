import express from "express";
import { CreateProject, getMemberTeam, getPMProjects, getProject, getTeamProjects } from "../Controllers/ProjectController.js";
import { AdminAccess } from "../Middleware/AdminAccess.js";
import  { PMAccess } from "../Middleware/PMAccess.js";

const router = express.Router();

router.post('/createproject',AdminAccess,CreateProject);
router.get('/getproject',AdminAccess,getProject);
router.get('/getmyproject/:id',getPMProjects);
router.get('/getmyteam/:id',PMAccess,getTeamProjects);
router.get('/getmemberteam/:id',getMemberTeam);

export default router;