import { Controller, Body, Post, UseGuards, ValidationPipe, HttpCode, HttpStatus, Get, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostType } from './post.entity';
import { User } from '../user/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { PostService } from './post.service';
import { prefixApi } from 'src/configs/constant.config';
import { UpdatePostDto } from './dto/update-post.dto'

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

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  updatePost(
    @GetUser() user: User,
    @Body(new ValidationPipe()) updatePostDto: UpdatePostDto
  ) {
    return this.postService.updatePost(updatePostDto, user)
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
