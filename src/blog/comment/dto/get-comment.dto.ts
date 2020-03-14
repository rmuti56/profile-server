import { IsNumber, } from "class-validator";
import { Type } from 'class-transformer'


export class GetCommentDto {
  @Type(() => Number)
  @IsNumber()
  pid: number;

}