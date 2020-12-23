import {Request} from "express";
import passport from'passport';
import google from'passport-google-oauth20';
import User from'../models/users';

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
          const { sub, name, email } = profile._json;
          console.log('profile.json : ', profile);
          User.findOne({ email }).then((user:any) => {
            if (user) {
            //   user.googleId = sub;
              // console.log('이미 있는 아이디 : ', user);
              done(null, user);
              return ;
            } else {
              //구글 로그인은 자동인증
              const user = new User({
                email,
                name,
                googleId: sub,
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
};


// function (accessToken: string, refreshToken:string, profile: google.Profile, done: (error: any, user?: any) => void) {
//     // console.log('profile.json : ', profile);
//     // console.log('accessToken : ', accessToken);
//     process.nextTick(() => {
//       const { sub, name, email } = profile._json;

//       User.findOne({ email }).then((user:any) => {
//         if (user) {
//         //   user.googleId = sub;
//           // console.log('이미 있는 아이디 : ', user);
//           done(null, user);
//         } else {
//           //구글 로그인은 자동인증
//           const user = new User({
//             email,
//             name,
//             googleId: sub,
//           });
//           user.save().then((user:any) => {
//             done(null, user);
//           });
//         }
//       });
//     });
//   }