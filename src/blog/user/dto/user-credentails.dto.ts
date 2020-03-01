
import { IsString, Min, Max, IsEmail, MinLength, MaxLength } from 'class-validator';

export class UserCredentailsDto {

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  username: string;

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

}