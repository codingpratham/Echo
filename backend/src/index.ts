import 'dotenv/config';
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db.js';
import indexRouter from './routes/index.r.js';
import http from 'http';
import { Server } from 'socket.io';
import { registerChatSocket } from './controller/chat.c.js';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    }
});
registerChatSocket(io);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use('/api/v1',indexRouter)
connectDB();


app.get('/',(req,res)=>{
    res.send('Hello World!');
})

server.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
