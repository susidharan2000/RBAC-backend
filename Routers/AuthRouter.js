import express from "express";
import { googleAuth, loginUser, registerUser } from "../Controllers/AuthController.js";

const router = express.Router();

router.post('/registeruser',registerUser);
router.post('/login',loginUser);
router.post('/googleauth',googleAuth);

export default router;