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
    // console.log("me")
    if (!req.user) {
      return res.json({ message: '유저가 없음' });
    }
    const user = req.user;
  
    return res.json(user);
  };
export const logout = async (req:Request|any, res:Response) => {
    console.log("로그아웃 접근")
    if (!req.user) {
      return res.json({ message: '유저가 없음' });
    }
    try {
        req.user.tokens = req.user.tokens.filter((token:any) => {
          return token.token !== req.token;
        });
        // req.user.isActivated = req.user.isActivated - 1;
        await req.user.save();

        console.log('로그아웃 되었습니다!', req.user.email);
        res.clearCookie('x_auth').send('로그아웃 되었습니다!');
      } catch (e) {
        res.status(500).send('로그아웃 에러');
      }
    // const user = req.user;
  
    // return res.json(user);
  };
  export const logoutAll = async (req: Request | any, res:Response) => {
    // useFindAndModify
    if (!req.user) {
      return res.json({ message: '유저가 없음' });
    }
  
    try {
      req.user.tokens = [];
      req.user.isActivated = 0;
      await req.user.save();
      console.log('모든 기기에서 로그아웃 되었습니다!', req.user.email);
  
      res.clearCookie('x_auth').send('전체 로그아웃 되었습니다!');
    } catch (e) {
      res.status(500).send('로그아웃 에러');
    }
  };
// export  {getUsers, me};
