import {Request, Response, NextFunction} from "express";
import {IUser, User} from'../models/users';

const auth = async (req:any, res:any, next:NextFunction) => {
    // console.log("auth")
    try {
        const token = await req.cookies.x_auth; // x_auth 가 자꾸없다는데?
        // console.log(req.cookies);
        if (!token){
            next();
        }
        const user = await User.findByToken(token, process.env.JWT_SECRET_KEY!)//non-null assertion operator
        // req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.log("왜 안나오냐 토큰")
        next();
    }
};

export =  auth;