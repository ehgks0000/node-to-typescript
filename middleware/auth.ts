import {Request, Response, NextFunction} from "express";
import {IUser, User} from'../models/users';

const auth = (req:Request|any, res:Response, next:NextFunction) => {
  const token = req.cookies.x_auth;
  if (!token) {
    next();
  }

  User.findByToken(token, process.env.JWT_SECRET_KEY!)//non-null assertion operator
    .then((user:any) => {
      if (!user) {
        // console.log('auth : 로그인 안되어 있습니다!');
        return res.clearCookie('x_auth');
      }
      req.token = token;
      req.user = user;
      next();
    })
    .catch(() => {
      //   console.log('auth : 로그인 안되어 있습니다!');
      //   res.clearCookie('x_auth');
      throw new Error('please authenticate');
    });
};

module.exports = { auth };