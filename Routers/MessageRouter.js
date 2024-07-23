import express from "express";
import { getAllMessages, SendMessage } from "../Controllers/MessageController.js";
import { Protect } from "../Middleware/Protect.js";

const router = express.Router();

router.post('/sendMessage',Protect,SendMessage);  // send message
router.get('/chat/:chatId',Protect,getAllMessages);  // get all chat messages

export default router; 