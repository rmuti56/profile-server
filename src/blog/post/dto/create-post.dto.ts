import { IsString, IsOptional, MinLength, MaxLength } from "class-validator";

export class CreatePostDto {

  @IsString()
  textHtml: string

  @IsString()
  @MinLength(10)
  @MaxLength(512)
  title: string;

  @IsOptional()
  @IsString()
  imageTitlePath: string;

  @IsOptional()
  @IsString()
  @MinLength(20)
  @MaxLength(1024)
  description: string;

}