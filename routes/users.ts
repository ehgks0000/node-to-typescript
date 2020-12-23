import express, {Request, Response, NextFunction} from 'express';
const passport = require('passport');

import {getUsers} from "../controllers/users";
const router = express.Router();

const ClientUrl = "localhost:8000";


router
    .route("/")
    .get(getUsers);
// router.route("/").get(getUsers);
router
  .route('/auth/google')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));
// .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/auth/google/callback').get(
  passport.authenticate('google', {
    // successRedirect: '/auth/google/success',
    failureRedirect: "/",
  }),
  // successRedirect(),
  async (req:Request, res:Response) => {
    const user = req.user;
    try {
      
      return res.redirect(`http://localhost:8000/users`);
        // .cookie('x_auth', userToken)
        // .clearCookie('reset_auth')
    } catch (err) {
      res.json({ loginSuccess: false, err: '토큰 오류' });
    }
  },
);

export = router;
