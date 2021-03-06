import { Controller, Post, Body, ValidationPipe, HttpCode, HttpStatus, UseGuards, Get, Req, Res, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, request, Response } from 'express';

import { UserService } from '../user/user.service';
import { UserCredentailsDto } from '../user/dto/user-credentails.dto';
import { UserSigninDto } from './dto/user-signin.dto';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  @Post('signup')
  async signUp(@Body(new ValidationPipe()) userDto: UserCredentailsDto) {
    return await this.userService.signUp(userDto)
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body(new ValidationPipe()) userSigninDto: UserSigninDto) {
    return await this.authService.signIn(userSigninDto);
  }



  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {
    // return user
    // return await this.authService.facebookSignIn(user);
  }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginCallback(@GetUser() user, @Res() res: Response) {
    // handles the Google OAuth2 callback
    const token = await this.authService.facebookSignIn(user);
    if (token)
      res.redirect(`http://localhost:5000/api?token=${token.accessToken}&refreshToken=${token.refreshToken}`);
    else
      res.redirect('http://localhost:5000');
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@GetUser() user, @Res() res: Response) {
    // handles the Google OAuth2 callback
    const token = await this.authService.googleSignIn(user);
    if (token)
      res.redirect(`http://localhost:5000/api?token=${token.accessToken}&refreshToken=${token.refreshToken}`);
    else
      res.redirect('http://localhost:5000');
  }


  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin() {
    // initiates the github  login flow
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async  githubLoginCallback(@GetUser() user, @Res() res) {
    // handles the github  callback
    const token = await this.authService.githubSignIn(user);
    if (token)
      res.redirect(`http://localhost:5000/api?token=${token.accessToken}&refreshToken=${token.refreshToken}`);
    else
      res.redirect('http://localhost:5000');
  }

}
