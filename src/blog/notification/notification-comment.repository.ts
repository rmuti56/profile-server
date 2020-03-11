import { EntityRepository, Repository } from "typeorm";
import { NotificationComment } from "./notification-comment.entity";
import { User } from "../user/user.entity";
import { Comment } from "../comment/comment.entity";


@EntityRepository(NotificationComment)
export class NotificationCommentRepository extends Repository<NotificationComment>{

  async createNotificationComment(
    user: User,
    comment: Comment
  ): Promise<NotificationComment> {
    const notificationComment = new NotificationComment();
    notificationComment.user = user;
    notificationComment.comment = comment;
    return await this.save(notificationComment);
  }


}