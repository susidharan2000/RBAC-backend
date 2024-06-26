import express from "express";
import { forgotPassword, googleAuth, loginUser, registerUser, resetPassword } from "../Controllers/AuthController.js";

const router = express.Router();

router.post('/registeruser',registerUser);
router.post('/login',loginUser);
router.post('/googleauth',googleAuth);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password/:id/:token',resetPassword);

export default router;