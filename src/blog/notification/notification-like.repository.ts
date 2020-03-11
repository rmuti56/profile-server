import { EntityRepository, Repository } from "typeorm";
import { NotificationLike } from "./notification-like.entity";
import { User } from "../user/user.entity";
import { ENotiLike } from "./enum/notification-like.enum";
import { Post } from "../post/post.entity";
import { Comment } from "../comment/comment.entity";

@EntityRepository(NotificationLike)
export class NotificationLikeRepository extends Repository<NotificationLike>{

  async createNotificationLike(
    user: User,
    type: ENotiLike,
    comment?: Comment,
    post?: Post
  ): Promise<NotificationLike> {
    const notificationLike = await this.findOne({
      where: [
        { comment }, { post }
      ]
    }) || new NotificationLike();
    notificationLike.user = user;
    notificationLike.typeLike = type;

    if (type === ENotiLike.LIKECOMMENT) {
      notificationLike.comment = comment;
    } else {
      notificationLike.post = post;
    }

    return await this.save(notificationLike);
  }
}