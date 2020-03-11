import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { NotificationCommentRepository } from './notification-comment.repository';
import { NotificationRepository } from './notification.repository';
import { NotificationLikeRepository } from './notification-like.repository';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';
import { Post } from '../post/post.entity';
import { ENotiLike } from './enum/notification-like.enum';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationCommentRepository, 'blog')
    private notificationCommentRepo: NotificationCommentRepository,
    @InjectRepository(NotificationRepository, 'blog')
    private notificationRepo: NotificationRepository,
    @InjectRepository(NotificationLikeRepository, 'blog')
    private notificationLikeRepo: NotificationLikeRepository

  ) { }

  async createNotificationComment(user: User, comment: Comment) {
    const notificationComment = await this.notificationCommentRepo.createNotificationComment(user, comment);
    return await this.notificationRepo.createNotificationComment(user, notificationComment)
  }

  async createNotificationLike(
    user: User,
    type: ENotiLike,
    comment?: Comment,
    post?: Post) {
    const notificationLike = await this.notificationLikeRepo.createNotificationLike(user, type, comment, post);
    return await this.notificationRepo.createNotificationLike(user, notificationLike);
  }
}
