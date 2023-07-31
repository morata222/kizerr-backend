import express from 'express';
import {VerifyToken} from '../middleware/jwt.js';
import { createMessage , getMessages } from '../controllers/message.controller.js';
const router = express.Router();

router.post('/createmessage', VerifyToken, createMessage);
router.get('/messages/:conversationId', VerifyToken, getMessages);

export default router;