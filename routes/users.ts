import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();


router
    .route("/")
    .get((req:Request, res:Response, next:NextFunction) => {
        console.log("connect users router")
        res.send("Hello users router!");
});
// router.route("/").get(getUsers);

export = router;
