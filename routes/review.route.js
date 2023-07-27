import express from 'express'
const router = express.Router()
import {createReview, getReviews,deleteReview} from '../controllers/review.controller.js'
import { VerifyToken } from '../middleware/jwt.js'

router.post('/reviews',VerifyToken, createReview)
router.get('/reviews/:gigId', getReviews)
router.delete('/reviews/:id', VerifyToken, deleteReview)

export default router

