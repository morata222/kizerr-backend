import express from 'express';
import {VerifyToken} from '../middleware/jwt.js';
const router = express.Router();

import { createConversation, getConversation, updateConversation , getAllConversations } from '../controllers/conversation.controller.js';

router.post('/createConversation', VerifyToken, createConversation);
router.get('/getConversation/:conversationId', VerifyToken, getConversation);
router.get('/getAllConversations', VerifyToken, getAllConversations);
router.put('/updateConversation/:conversationId', VerifyToken, updateConversation);


export default router;

