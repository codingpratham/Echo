import 'dotenv/config';
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors())

connectDB();



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})