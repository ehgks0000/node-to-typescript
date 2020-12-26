import express, {Request, Response, NextFunction} from 'express';
import User from "../models/users";


const getUsers =async (req: Request, res:Response, next:NextFunction)=>{

    console.log("connect users router")
    try {
        const user = await User.find();
        return res.json(user);
    } catch (err) {
        return res.json({message:err})
    }
}

export  {getUsers};