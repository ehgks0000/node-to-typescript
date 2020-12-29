import "dotenv/config";
import cors = require("cors");
import express, {Application,Request, Response, NextFunction} from 'express';
import {json, urlencoded} from "body-parser";
import helmet from "helmet";
import session from'express-session';
import cookieparser from "cookie-parser";
import connectDB from "./db";
connectDB();
import passport from "passport";
const passportConfig = require('./lib/passport');

import userRouter from "./routes/users";
import memoRouter from "./routes/memos";
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 8000;

const app:Application = express();
app.use(helmet());
app.use(cors(
    {
        origin:true,
        credentials:true
    }
));
//-------------------------------------------------------------------------------
app.use(cookieparser()); // request 객체에 cookies 속성이 부여 // 이거없어서 로그인 못했음 
app.use(
    session({
      cookie: {
        secure: true,
        maxAge: 60000,
      },
    //   store: new MemoryStore({
    //     checkPeriod: 86400000, // prune expired entries every 24h
    //   }),
      // store: new connectDB(),
      secret: process.env.EXPRESS_SESSION!,
      resave: false,
      saveUninitialized: true,
    }),
  );
  //-----------------------------------------------
  app.use(json()); // json 형식처리
app.use(urlencoded({extended: true}));//from 처리
//-----------------------------------------------------
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

//--------------------------------------------------------------
app.get("/", (req:Request, res:Response, next:NextFunction)=>{
    res.send(`Hello! Typescript Node Server <br/>
    <li><a href="${process.env.CLIENT_URL}:${port}/users">/users</a></li>
    <li><a href="${process.env.CLIENT_URL}:${port}/users/auth/google">/users/auth/google</a></li>
    <li><a href="${process.env.CLIENT_URL}:${port}/users/auth/naver">/users/auth/naver</a></li>
    <li><a href="${process.env.CLIENT_URL}:${port}/users/auth/kakao">/users/auth/kakao</a></li>
    <li><a href="${process.env.CLIENT_URL}:${port}/users/me">/users/me</a></li>

    <li><a href="${process.env.CLIENT_URL}:${port}/memos/getMemo">/memos/getMemo</a></li>
    <li><a href="${process.env.CLIENT_URL}:${port}/memos/getMemobyId">/usememosrs/getMemobyId</a></li>
    `);

})
app.use("/users", userRouter);
app.use("/memos", memoRouter);

app.listen(port,()=>{
    console.log(`start typescript server ${port}`);
})