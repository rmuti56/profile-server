import { Module } from '@nestjs/common';
import { JwtModule, } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { UserRepository } from '../user/user.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { secret } from 'src/configs/secret.config';
import { JwtStratygy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository], 'blog'),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: secret,
      signOptions: {
        expiresIn: '3h',
      }
    })
  ],
  providers: [AuthService, UserService, JwtStratygy],
  controllers: [AuthController]
})
export class AuthModule { }
