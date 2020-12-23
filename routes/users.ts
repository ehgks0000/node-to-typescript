import express, {Request, Response, NextFunction} from 'express';
import {getUsers} from "../controllers/users";

const router = express.Router();


router
    .route("/")
    .get(getUsers);
// router.route("/").get(getUsers);

export = router;
