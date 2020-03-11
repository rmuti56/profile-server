import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { PostRepository } from '../post/post.repository';
import { LikeCommentRepository } from './comment-like.repository';
import { NotificationCommentRepository } from '../notification/notification-comment.repository';
import { NotificationLikeRepository } from '../notification/notification-like.repository';
import { NotificationRepository } from '../notification/notification.repository';
import { NotificationService } from '../notification/notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    CommentRepository,
    PostRepository,
    LikeCommentRepository,
    NotificationCommentRepository,
    NotificationLikeRepository,
    NotificationRepository
  ], 'blog')],
  controllers: [CommentController],
  providers: [CommentService, NotificationService]
})
export class CommentModule { }
