import { IsString, IsOptional, MinLength, MaxLength, IsNumber } from "class-validator";
import { Type } from 'class-transformer'

export class UpdatePostDto {

  @Type(() => Number)
  @IsNumber()
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