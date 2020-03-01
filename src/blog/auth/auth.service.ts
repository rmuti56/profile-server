import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { UserSigninDto } from './dto/user-signin.dto';
import { IToken } from './interface/token.interface';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository, 'blog')
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }

  async signIn(userSignInDto: UserSigninDto) {
    const user = await this.userRepository.validateUserPassword(userSignInDto);

    if (!user) {
      throw new UnauthorizedException('invalid username or password');
    }

    return await this.genToken(user);
  }

  async facebookSignIn(facebookProfileDto) {
    let user = await this.userRepository.findOne({ username: `facebook${facebookProfileDto.id}` });

    if (!user) {
      user = await this.userRepository.createUserByFackBook(facebookProfileDto);
    }

    return await this.genToken(user);
  }

  async githubSignIn(githubProfileDto) {
    let user = await this.userRepository.findOne({ username: `github${githubProfileDto.id}` });

    if (!user) {
      user = await this.userRepository.createUserByGithub(githubProfileDto);
    }

    return await this.genToken(user);
  }


  async googleSignIn(googleProfileDto) {
    let user = await this.userRepository.findOne({ username: `google${googleProfileDto.id}` });

    if (!user) {
      user = await this.userRepository.createUserByGoogle(googleProfileDto);
    }

    return await this.genToken(user);
  }




  async genToken(user: User): Promise<IToken> {
    const payload = { username: user.username, role: user.roles }
    const refreshToken = await this.jwtService.sign(payload, { subject: user.password, expiresIn: '2w' })
    const accessToken = await this.jwtService.sign(payload, { subject: user.password });
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);
    return { accessToken, refreshToken }
  }

  async getToken(userPayload, refreshToken: string): Promise<IToken> {
    const user = await this.userRepository.findOne({ where: { username: userPayload.username } })
    if (!user || !user.username || user.password !== userPayload.sub || refreshToken !== user.refreshToken) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return await this.genToken(user)
  }


}
