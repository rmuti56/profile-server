import { EntityRepository, Repository } from "typeorm";
import { Comment } from "./comment.entity";
import { Post } from "../post/post.entity";
import { User } from "../user/user.entity";
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from "./dto/update-comment.dto";


@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment>{


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