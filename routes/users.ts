import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();


router
    .route("/")
    .get((req:Request, res:Response, next:NextFunction) => {
        res.send("hello users router");
});
// router.route("/").get(getUsers);

export = router;
