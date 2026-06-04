import express from 'express'
import { getAllUser ,getUserByName,deleteUser } from '../controller/user.c.js';

const router = express.Router();

router.get('/all',getAllUser);
router.get('/:name',getUserByName);
router.delete('/:id',deleteUser);

export  default router;