import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { PostRepository } from '../post/post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository, PostRepository], 'blog')],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule { }
