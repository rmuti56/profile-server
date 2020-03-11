import { Repository, EntityRepository } from "typeorm";
import { Notification } from "./notification.entity";
import { User } from "../user/user.entity";
import { ENotiType } from "./enum/notification-type.enum";
import { Comment } from "../comment/comment.entity";
import { NotificationComment } from "./notification-comment.entity";
import { NotificationLike } from "./notification-like.entity";

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification>{

  async createNotificationComment(
    user: User,
    notiComment: NotificationComment
  ): Promise<Notification> {
    const notification = new Notification();
    notification.notiType = ENotiType.COMMENT;
    notification.notiComment = notiComment;
    notification.recipient = notiComment.comment.post.user;

    return await this.save(notification);
  }

  async createNotificationLike(
    user: User,
    notiLike: NotificationLike
  ): Promise<Notification> {
    const notification = await this.findOne({ notiLike }) || new Notification();
    notification.notiType = ENotiType.LIKE;
    notification.unread = true;
    notification.notiLike = notiLike;
    notification.recipient = notiLike.comment?.user || notiLike.post?.user;

    return await this.save(notification);
  }

}