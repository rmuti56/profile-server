import { IsString, IsOptional, MinLength, MaxLength, IsNumber, IsNumberString } from "class-validator";

export class UpdatePostDto {

  @IsNumberString()
  pid: number;

  @IsOptional()
  @IsString()
  textHtml: string

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(512)
  title: string;

  @IsOptional()
  @IsOptional()
  @IsString()
  imageTitlePath: string;

  @IsOptional()
  @IsString()
  @MinLength(20)
  @MaxLength(1024)
  description: string;

}