import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CommentRepository } from './comment.repository';
import { PostRepository } from '../post/post.repository';
import { User } from '../user/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './comment.entity';
import { LikeCommentRepository } from './comment-like.repository';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository, 'blog')
    private commentRepository: CommentRepository,
    @InjectRepository(PostRepository, 'blog')
    private postRepository: PostRepository,
    @InjectRepository(LikeCommentRepository, 'blog')
    private likeCommentRepository: LikeCommentRepository
  ) { }

  async createComment(user: User, createCommentDto: CreateCommentDto): Promise<Comment> {
    if (!createCommentDto.imageComment && !createCommentDto.text) {
      throw new BadRequestException(`comment is required text or image`)
    }
    const post = await this.postRepository.findOne({ pid: createCommentDto.pid });
    if (!post) {
      throw new NotFoundException(`Post with Id ${createCommentDto.pid} not found`)
    }
    //ตรงนี้ต้องมีแจ้งเตือนคอมเม้น 
    return await this.commentRepository.createComment(user, post, createCommentDto);
  }

  async updateComment(user: User, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ cid: updateCommentDto.cid, user })
    if (!comment) {
      throw new NotFoundException(`User Comment with Id ${updateCommentDto.cid} not found`);
    }
    return await this.commentRepository.updateComment(comment, updateCommentDto);
  }

  async likeComment(
    cid: number,
    user: User
  ) {
    const comment = await this.commentRepository.findOne({ cid });
    if (!comment) {
      throw new NotFoundException(`Post with Id ${cid} not found`)
    }

    const newLikeComment = await this.likeCommentRepository.likeComment(user, comment);
    return await this.likeCommentRepository.findOne({
      comment: newLikeComment.comment,
      user: user
    })
  }



}
