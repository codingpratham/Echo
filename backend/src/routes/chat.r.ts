import express from 'express'
import { chatController } from '../controller/chat.c.js'
import { AuthMiddleware } from '../middleware/auth.m.js'
const router = express.Router()

router.use(AuthMiddleware)

router.get('/', chatController)

export default router
