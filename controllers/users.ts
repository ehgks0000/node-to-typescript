import express, {Request, Response, NextFunction} from 'express';


const getUsers = (req: Request, res:Response, next:NextFunction)=>{

    console.log("connect users router")
    res.send("Hello users router!");
}

export  {getUsers};