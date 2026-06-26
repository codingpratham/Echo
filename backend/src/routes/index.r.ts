import express from 'express';
import authRouter from './auth.r.js';
import userRouter from './user.r.js';
import chatRouter from './chat.r.js';

const router = express.Router();

router.use('/auth',authRouter);
router.use('/user',userRouter);
router.use('/chat',chatRouter)

export default router;
