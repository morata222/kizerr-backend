import express from 'express'
import { DeleteUser , getUser } from '../controllers/user.controller.js'
import { VerifyToken } from '../middleware/jwt.js'
const router = express.Router()

router.delete('/users/:id' , VerifyToken , DeleteUser)
router.get('/users/:id', getUser)

export default router