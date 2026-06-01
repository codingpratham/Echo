import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import connectDB from './utils/db.js'
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors())

const connectToDB = async () => {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log('Connected to MongoDB');
}

connectToDB()

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})