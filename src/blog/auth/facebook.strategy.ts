import { Injectable } from "@nestjs/common";
import * as facebookTokenStrategy from 'passport-facebook-token';
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
      new facebookTokenStrategy({
        clientID: process.env.FACEBOOK_CLIENTID,
        clientSecret: process.env.FACEBOOK_CLIENTSECRET,
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