import express from "express";
import { accessChat, addToGroup, createGroupChat, fetchChat, fetchChatById, removefromGroup, renameGroup } from "../Controllers/ChatController.js";
import { Protect } from "../Middleware/Protect.js";



const router = express.Router();

router.post('/accesschat',Protect,accessChat); // create chat and access the chat
router.get('/getChat',Protect,fetchChat); // get all the chat
router.get('/getChatById/:id',Protect,fetchChatById); //get the chat by Id
router.post('/creategroup',Protect,createGroupChat); // creation of group
router.put('/renamegroup',Protect,renameGroup); // rename the group
router.put('/removefromgroup',Protect,removefromGroup); // remove user from group
router.put('/addgroup',Protect,addToGroup); // add user to group group

export default router; 