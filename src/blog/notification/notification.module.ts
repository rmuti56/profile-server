import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationCommentRepository } from './notification-comment.repository';
import { NotificationLikeRepository } from './notification-like.repository';
import { NotificationRepository } from './notification.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [NotificationCommentRepository,
        NotificationLikeRepository,
        NotificationRepository], 'blog')
  ],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule { }
