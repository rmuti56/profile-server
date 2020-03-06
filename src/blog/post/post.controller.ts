import { Controller, Body, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostType } from './post.entity';
import { User } from '../user/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { PostService } from './post.service';
import { prefixApi } from 'src/configs/constant.config';

@Controller(`${prefixApi}post`)
export class PostController {
  constructor(
    private postService: PostService
  ) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createPost(
    @GetUser() user: User,
    @Body(new ValidationPipe()) createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto, user);
  }
}
