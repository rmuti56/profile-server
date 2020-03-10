import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateCommentDto {
  @Type(() => Number)
  @IsNumber()
  cid: number;

  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  imageComment: string;
}