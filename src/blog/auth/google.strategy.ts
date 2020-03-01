import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import 'dotenv/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{

  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENTID,     // <- Replace this with your client id
      clientSecret: process.env.GOOGLE_CLIENTSECRET, // <- Replace this with your client secret
      callbackURL: 'http://localhost:5000/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile']
    })
  }


  async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function) {
    console.log(accessToken)
    try {
      console.log(profile);

      const jwt: string = 'placeholderJWT'
      const user =
      {
        jwt
      }

      done(null, user);
    }
    catch (err) {
      // console.log(err)
      done(err, false);
    }
  }

}