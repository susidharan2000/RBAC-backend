import express from "express";
import { getallusers, getuser, getuserbyid, searchuser, updateProfile, updaterole } from "../Controllers/UserController.js";
import { AdminAccess } from "../Middleware/AdminAccess.js";
import { PMAccess } from "../Middleware/PMAccess.js";
import { VerifyToken } from "../Middleware/VerifyToken.js";


const router = express.Router();


router.put('/updateprofile/:id',VerifyToken,updateProfile);
router.get('/getallusers',AdminAccess,getallusers);
router.get('/getusers',PMAccess,getallusers);
router.get('/users',getuser);
router.put('/updaterole',AdminAccess,updaterole);
router.get('/getuserbyid/:id',AdminAccess,getuserbyid);
router.get('/search/username',searchuser);

export default router;