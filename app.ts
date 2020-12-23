import "dotenv/config";
import cors = require("cors");
import express, {Request, Response, NextFunction} from 'express';
import {json, urlencoded} from "body-parser";
import connectDB from "./db";
connectDB();
import passport from "passport";
const passportConfig = require('./lib/passport');
passportConfig();

import userRouter from "./routes/users";
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 8000;

const app = express();
app.use(cors());
app.use(urlencoded({extended: true}));
app.use(json());

app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req:Request, res:Response, next:NextFunction)=>{
    res.send(`Hello! Typescript Node Server <br/>
    <li><a href="${process.env.CLIENT_URL}:${port}/users">/users</a></li>
    <li><a href="${process.env.CLIENT_URL}:${port}/users/auth/google">/users/auth/google</a></li>
    `);

})
app.use("/users", userRouter);

app.listen(port,()=>{
    console.log(`start typescript server ${port}`);
})