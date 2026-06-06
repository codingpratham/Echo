import express from 'express';
import authRouter from './auth.r.js';
import userRouter from './user.r.js';

const router = express.Router();

router.use('/auth',authRouter);
router.use('/user',userRouter);

export default router;
