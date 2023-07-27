import express from 'express';
import { getGigs, getGig, createGig, deleteGig } from '../controllers/gig.controller.js';
import { VerifyToken } from '../middleware/jwt.js';

const router = express.Router();
router.post('/create',VerifyToken ,createGig);
router.delete('/gig/delete/:id',VerifyToken,deleteGig);
router.get('/gig/:id' ,getGig);
router.get('/gigs' ,getGigs);

export default router;
