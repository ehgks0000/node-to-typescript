import express, {Request, Response, NextFunction} from 'express';
import {User} from "../models/users";


const getUsers =async (req: Request, res:Response, next:NextFunction)=>{

    console.log("connect users router")
    try {
        const user = await User.find();
        return res.json(user);
    } catch (err) {
        return res.json({message:err})
    }
}
const me = (req:Request, res:Response) => {
    if (!req.user) {
      return res.json({ message: '유저가 없음' });
    }
    const user = req.user;
  
    return res.json(user);
  };

export  {getUsers, me};