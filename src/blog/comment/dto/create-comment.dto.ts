import { IsString, IsOptional, IsInt, IsNumber, } from "class-validator";
import { Type } from 'class-transformer'


export class CreateCommentDto {
  @Type(() => Number)
  @IsNumber()
  pid: number;

  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  imageComment: string;
}