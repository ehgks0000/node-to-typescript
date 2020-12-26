import express, {Request, Response, NextFunction} from 'express';
import passport from'passport';
import {getUsers} from "../controllers/users";

const router = express.Router();


router
    .route("/")
    .get(getUsers);
router
  .route('/auth/google')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/auth/google/callback').get(
  passport.authenticate('google', {
    failureRedirect: "/",
  }),
  async (req:any, res:Response) => {
    const user = req.user;
    try {
        const expiresTime = '1h'; // 1시간 후 토큰 만료로 자동 로그아웃?
      const userToken = await user.generateToken(
        process.env.JWT_SECRET_KEY,
        expiresTime,
      );
      
      return res.cookie("x_auth",userToken).redirect("/");
    
    } catch (err) {
      res.json({ loginSuccess: false, err: '토큰 오류' });
    }
  },
);

router
  .route('/auth/naver')
  .get(passport.authenticate('naver'), (req:Request, res:Response) => {
    console.log('/users/auth/naver');
  });
router.route('/auth/naver/callback').get(
  passport.authenticate('naver', {
    failureRedirect: "/",
  }),
  async (req, res) => {
    try {
      return res.redirect("/");
    } catch (err) {
      res.json({ loginSuccess: false, err: '토큰 오류' });
    }
  },
);

router
  .route("/auth/kakao")
  .get(passport.authenticate("kakao"));

router
  .route("/auth/kakao/callback").get(
      passport.authenticate("kakao", {failureRedirect: "/"}),
      (req, res)=>{
          res.redirect("/users")
      }
  )

export = router;
