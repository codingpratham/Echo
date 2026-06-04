import type{ Request, Response } from "express";
import User from "../models/user.model.js";

export const getAllUser = async (req:Request,res:Response)=>{
    try{
        const user = await User.find();
        res.status(200).json({ user });
    }catch(e:any){
        console.error(e);
    }
}

export const getUserByName = async (req:Request,res:Response)=>{
    const { name } = req.params;

    if(!name){
        res.status(411).json({
            message:"input field is missing"
        })
        return;
    }

    try{
        const user = await User.findOne({ name });
        res.status(200).json({ user });
    }catch(e:any){
        console.error(e);
    }
}

export const deleteUser = async (req:Request,res:Response)=>{
    const { id } = req.params;

    if(!id){
        res.status(411).json({
            message:"input field is missing"
        })
        return;
    }

    try{
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({ user });
    }catch(e:any){
        console.error(e);
    }
}