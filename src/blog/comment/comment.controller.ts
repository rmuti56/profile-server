import { Controller, Post, Body, ValidationPipe, Patch, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/comment')
export class CommentController {
  constructor(
    private commentService: CommentService
  ) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createComment(
    @GetUser() user: User,
    @Body(new ValidationPipe()) createCommentDto: CreateCommentDto
  ) {
    return this.commentService.createComment(user, createCommentDto)
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  updateComment(
    @GetUser() user: User,
    @Body(new ValidationPipe()) updateCommentDto: UpdateCommentDto
  ) {
    return this.commentService.updateComment(user, updateCommentDto);
  }
}
