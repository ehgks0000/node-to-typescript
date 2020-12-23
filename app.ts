import "dotenv/config";
import express, {Request, Response, NextFunction} from 'express';
import router from "./routes/users";

const app = express();

app.get("/", (req:Request, res:Response, next:NextFunction)=>{
    res.send("hello");
})
app.use("/users", router)
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 1337;
app.listen(port,()=>{
    console.log(`start typescript server ${port}`)
})