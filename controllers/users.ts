import express, {Request, Response, NextFunction} from 'express';
import {User, IUser} from "../models/users";

// type Populated<M, K extends keyof M> =
//         Omit<M, K> &
//         {
//             [P in K]: Exclude<M[P], ID[] | ID>
//         };
export const getUsers =async (req: Request, res:Response, next:NextFunction)=>{
    
    console.log("connect users router")
    try {
        const user = await User.find();
        // const user = await User.find().populate("memos") as Populated<IUser, memos>;

        return res.json(user);
    } catch (err) {
        return res.json({message:err})
    }
}
export const me = (req:Request, res:Response) => {
    console.log("me")
    if (!req.user) {
      return res.json({ message: '유저가 없음' });
    }
    const user = req.user;
  
    return res.json(user);
  };
export const logout = (req:Request, res:Response) => {
    if (!req.user) {
      return res.json({ message: '유저가 없음' });
    }
    const user = req.user;
  
    return res.json(user);
  };

// export  {getUsers, me};