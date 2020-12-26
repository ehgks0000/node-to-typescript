import {Request} from "express";
import passport from'passport';
import google from'passport-google-oauth20';
import naver, { Profile } from "passport-naver";
import {Strategy as kakao} from "passport-kakao";
// const kakao = require("passport-kakao").Strategy;


import {User, IUser} from'../models/users';

module.exports = () => {

  passport.serializeUser(function (user:any, done:(error: any, user?: any) => void) {
    done(null, user.id);
  });
  passport.deserializeUser(function (user:any, done:(error: any, user?: any) => void) {
    // done(null, user);

    User.findById(user.id).then((user:any) => {
      done(null, user);
    });
  });

  const clientID = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const callbackURL = process.env.GOOGLE_REDIRECT_URIS;

  
    if (typeof callbackURL === "undefined") {
        throw new Error("callbackURL is undefined");
    }
    
    if (typeof clientID === "undefined") {
        throw new Error("clientID is undefined");
    }
    
    if (typeof clientSecret === "undefined") {
        throw new Error("clientSecret is undefined");
    }
    const n_clientID= process.env.NAVER_CLIENT_ID;
    const n_clientSecret= process.env.NAVER_CLIENT_SECRET;
    const n_callbackURL= process.env.NAVER_REDIRECT_URIS;

    if (typeof n_callbackURL === "undefined") {
        throw new Error("callbackURL is undefined");
    }
    
    if (typeof n_clientID === "undefined") {
        throw new Error("clientID is undefined");
    }
    
    if (typeof n_clientSecret === "undefined") {
        throw new Error("clientSecret is undefined");
    }
    const k_clientID= process.env.KAKAO_CLIENT_ID;
    const k_clientSecret= process.env.KAKAO_CLIENT_SECRET;
    const k_callbackURL= process.env.KAKAO_REDIRECT_URIS;

    if (typeof k_callbackURL === "undefined") {
        throw new Error("callbackURL is undefined");
    }
    
    if (typeof k_clientID === "undefined") {
        throw new Error("clientID is undefined");
    }
    
    if (typeof k_clientSecret === "undefined") {
        throw new Error("clientSecret is undefined");
    }


  passport.use(
    new google.Strategy(
      {
        clientID,
        clientSecret,
        callbackURL,
        passReqToCallback: true,
      },
      function (request:Request, accessToken: string, refreshToken:string, profile: google.Profile, done: (error: any, user?: any) => void) {
          // console.log('accessToken : ', accessToken);
          
        process.nextTick(() => {
          const { sub:googleId, name, email } = profile._json;
        //   console.log('profile.json : ', profile);
          User.findOne({ email }).then((user:any) => {
            if (user) {
              user.googleId = googleId;
              user.save();
              done(null, user);
              return ;
            } else {
              
              const user = new User({
                email,
                name,
                googleId,
              });
              user.save().then((user:any) => {
                done(null, user);
              });
            }
          });
        });
      },
    ),
  );

  passport.use(
    new naver.Strategy(
      {
        clientID: n_clientID,
        clientSecret: n_clientSecret,
        callbackURL: n_callbackURL,
        passReqToCallback: true,
      },
      function (request:Request, accessToken:string, refreshToken:string, profile: Profile, done: (error: any, user?: any) => void) {
        process.nextTick( function () {
          
            const { id:naverId, nickname:name, email } = profile._json;
            console.log(profile);
          User.findOne({ email }).then(user => {
            if (user) {
                user.naverId = naverId;
                user.save();
              return done(null, user);
            } else {
              //구글 로그인은 자동인증
              const user = new User({
                email,
                name:name ||email,
                naverId,
              });
              user.save().then(user => {
                return done(null, user);
              });
            }
          });

          
        });
      },
    ),
  );
  passport.use(
    new kakao(
      {
        clientID: k_clientID,
        clientSecret: "", // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
        callbackURL: k_callbackURL,
      },
      async (accessToken:string, refreshToken:string, profile: any, done: (error: any, user?: any) => void) => {
          const {id:kakaoId, username:name,_json:{kakao_account:{email}}}=profile;
        

        try {
          const user = await User.findOne({ email });
          if (user) {
            user.kakaoId = kakaoId;
            user.save();
            return done(null, user);
          } else {
            const newUser = new User({
              email,
              name,
              kakaoId,
            });
            return done(null, newUser);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

};



