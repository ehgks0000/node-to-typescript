import express, {Request, Response, NextFunction} from 'express';
import user from "../models/users";


const getUsers = (req: Request, res:Response, next:NextFunction)=>{

    console.log("connect users router")
    res.send("Hello users router!");
}

export  {getUsers};