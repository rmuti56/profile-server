import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from "../user/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { secret } from "src/configs/secret.config";

@Injectable()
export class JwtStratygy extends PassportStrategy(Strategy) {

  constructor(
    @InjectRepository(UserRepository, 'blog')
    private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    })
  }

  async validate(payload) {
    const { username } = payload;

    const user = await this.userRepository.selectUser(username)

    if (!user) {
      throw new UnauthorizedException();
    }

    return user
  }
}