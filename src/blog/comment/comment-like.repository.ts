import { EntityRepository, Repository } from "typeorm";
import { LikeComment } from "./comment-like.entity";
import { User } from "../user/user.entity";
import { Comment } from "./comment.entity";


@EntityRepository(LikeComment)
export class LikeCommentRepository extends Repository<LikeComment>{
  async likeComment(
    user: User,
    comment: Comment
  ) {
    const likeComment = await this.findOne({ user, comment }) || new LikeComment();
    likeComment.liked = !likeComment.liked;
    likeComment.user = user;
    likeComment.comment = comment;

    return await this.save(likeComment);
  }
}