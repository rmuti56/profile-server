import { EntityRepository, Repository } from "typeorm";
import { Comment } from "./comment.entity";
import { Post } from "../post/post.entity";
import { User } from "../user/user.entity";
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { LikeComment } from "./comment-like.entity";
import { PostStatus } from "../post/enum/post-status.enum";


@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment>{

  async getCommentBycommentId(
    postId: number,
    user?: User,
    skip = 0,
    take = 20
  ): Promise<Comment[]> {

    let query = this.createQueryBuilder('comment')

    if (user) {
      query.addSelect(subQuery => {
        return subQuery
          .select("COUNT(likes.userId)", "liked")
          .from(LikeComment, "likes")
          .where('likes.userId = :userId', { userId: user.uid })
          .andWhere('likes.commentId = comment_cid')
      }, "isLiked")
    }

    query
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.post', 'post')
      .leftJoinAndSelect(subQuery => {
        return subQuery
          .select("likes.*")
          .from(LikeComment, "likes")
          .addSelect('userLike.firstname', 'userLikeFirstName')
          .addSelect('userLike.lastName', 'userLikeLastName')
          .addSelect('userLike.uid', 'userLikeUid')
          .addSelect('userLike.imageProfile', 'userLikeImageProfile')
          .leftJoin('likes.user', 'userLike')
          .skip(0)
          .take(10)
      }, "likes", "likes.commentId = comment.cid and likes.liked=TRUE")
      .where('comment.status = :status', { status: PostStatus.ACTIVE })
      .andWhere('comment.postId = :postId', { postId })
      .orderBy("comment.cid", "DESC")
      .skip(skip)
      .take(take)

    // return await query.getQuery();
    try {
      const rawEntity = await query.getRawAndEntities();
      return this.margeRowEntity(rawEntity);
    } catch (error) {
      console.log(error)
    }


  }

  margeRowEntity(rawEntity): Comment[] {
    //  console.log(rawEntity)
    let comments;
    let raws = rawEntity.raw;
    comments = rawEntity.entities;
    raws.forEach(raw => {
      if (raw.userLikeUid) {
        let commentPost = {
          timestamp: raw.timestamp,
          user: {
            uid: raw.userLikeUid,
            firstname: raw.userLikeFirstName,
            lastname: raw.userLikeLastName,
            imageProfile: raw.userLikeImageProfile
          }
        }
        const comment = comments.find(comment => comment.cid === raw.comment_cid)
        comment.isLiked = !!Number(raw.isLiked);
        if (comment.likes) {
          comment.likes.push(commentPost)
        } else {
          comment.likes = [commentPost]
        }
      }
    })
    return comments;
  }


  async createComment(
    user: User,
    post: Post,
    createCommentDto: CreateCommentDto
  ): Promise<Comment> {
    const comment = new Comment();
    comment.user = user;
    comment.post = post;
    comment.text = createCommentDto.text;
    comment.imageComment = createCommentDto.imageComment;

    return await this.save(comment);
  }

  async updateComment(
    comment: Comment,
    updateCommentDto: UpdateCommentDto
  ): Promise<Comment> {
    comment.imageComment = updateCommentDto.imageComment || comment.imageComment;
    comment.text = updateCommentDto.text || comment.text;
    return await this.save(comment);
  }




}