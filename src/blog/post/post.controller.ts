import { Controller, Body, Post, UseGuards, ValidationPipe, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostType } from './post.entity';
import { User } from '../user/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { PostService } from './post.service';
import { prefixApi } from 'src/configs/constant.config';
import { IsString } from 'class-validator';
import { isString } from 'util';

@Controller(`${prefixApi}post`)
export class PostController {
  constructor(
    private postService: PostService
  ) { }

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Get('/byuser')
  @UseGuards(AuthGuard('jwt'))
  getPostByUser(
    @GetUser() user: User
  ) {
    return this.postService.getPosts(user);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createPost(
    @GetUser() user: User,
    @Body(new ValidationPipe()) createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto, user);
  }

  @Post('like')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  likePost(
    @GetUser() user: User,
    @Body('postId') postId: string

  ) {
    return this.postService.likePost(postId, user);

  }
}
