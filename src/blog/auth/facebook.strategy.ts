// import { Injectable } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { Strategy } from "passport-facebook";
// import 'dotenv/config';

// @Injectable()
// export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook')
// {

//   constructor() {
//     super({
//       clientID: process.env.FACEBOOK_CLIENTID,     // <- Replace this with your client id
//       clientSecret: process.env.FACEBOOK_CLIENTSECRET, // <- Replace this with your client secret
//       callbackURL: "http://localhost:5000/auth/facebook/callback",
//       passReqToCallback: true,
//       scope: ['profile']
//     })
//   }


//   async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function) {
//     try {
//       const user = profile
//       done(null, user);

//     }
//     catch (err) {
//       // console.log(err)
//       done(err, false);
//     }
//   }

// }

import { Injectable } from "@nestjs/common";
import * as facebookTokenStrategy from 'passport-facebook-token';
import { Strategy } from "passport-facebook";
import { use } from 'passport'
import 'dotenv/config';


@Injectable()
export class FacebookStrategy {
  constructor(

  ) {
    this.init();
  }

  init() {
    use(
      new Strategy({
        clientID: process.env.FACEBOOK_CLIENTID,
        clientSecret: process.env.FACEBOOK_CLIENTSECRET,
        callbackURL: 'http://localhost:5000/auth/facebook/callback'
      },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: any
        ) => {
          const user = profile;
          return done(null, user);
        }

      )
    )
  }
}

