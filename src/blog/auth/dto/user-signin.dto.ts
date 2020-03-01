
import { IsString, MinLength, MaxLength } from 'class-validator';

export class UserSigninDto {

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  username: string;

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  password: string;
}