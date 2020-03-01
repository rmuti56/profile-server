import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserCredentailsDto } from '../user/dto/user-credentails.dto';
import { UserSigninDto } from './dto/user-signin.dto';
import { AuthService } from './auth.service';

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
  signIn(@Body(new ValidationPipe()) userSigninDto: UserSigninDto) {
    console.log(userSigninDto);
  }

}
