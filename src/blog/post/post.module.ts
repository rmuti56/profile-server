import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { LikePostRepository } from './post-like.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository, LikePostRepository], 'blog')],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule { }
