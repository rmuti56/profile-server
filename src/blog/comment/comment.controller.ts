import { Controller, Post, Body, ValidationPipe, Patch, UseGuards, Get } from '@nestjs/common';
import { CommentService } from './comment.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetCommentDto } from './dto/get-comment.dto';

@Controller('api/comment')
export class CommentController {
  constructor(
    private commentService: CommentService
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getCommentByPostId(
    @GetUser() user: User,
    @Body(new ValidationPipe()) getCommentDto: GetCommentDto
  ) {
    return this.commentService.getCommentsByPostId(getCommentDto, user);
  }

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

  @Post('/like')
  @UseGuards(AuthGuard('jwt'))
  likeComment(
    @GetUser() user: User,
    @Body('cid') cid: number
  ) {
    return this.commentService.likeComment(cid, user);
  }
}
