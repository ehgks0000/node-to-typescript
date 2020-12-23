import "dotenv/config";
import express, {Request, Response, NextFunction} from 'express';
import router from "./routes/users";
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 1337;

const app = express();
// http://localhost:8000/users
app.get("/", (req:Request, res:Response, next:NextFunction)=>{
    res.send(`Hello! Typescript Node Server <br/>
    <li><a href="${process.env.CLIENT_URL}:${port}/users">/users</a></li>
    `);
    
})
app.use("/users", router)

app.listen(port,()=>{
    console.log(`start typescript server ${port}`)
})