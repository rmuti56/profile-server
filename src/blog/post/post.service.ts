import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/user.entity';
import { Post } from './post.entity';
import { LikePostRepository } from './post-like.repository';
import { LikePost } from './post-like.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository, 'blog')
    private postRepository: PostRepository,
    @InjectRepository(LikePostRepository, 'blog')
    private likePostRepository: LikePostRepository
  ) { }

  async createPost(
    createPostDto: CreatePostDto,
    user: User
  ): Promise<Post> {
    return await this.postRepository.createPost(createPostDto, user);
  }


  async updatePost(
    updatePostDto: UpdatePostDto,
    user: User
  ): Promise<Post> {
    const post = await this.postRepository.getMyPost(user, updatePostDto.pid);

    if (!post) {
      throw new NotFoundException(`User post with Id ${updatePostDto.pid} not found`)
    }

    Object.keys(new UpdatePostDto()).forEach(key => {
      if (key != 'pid' && updatePostDto[key])
        post[key] = updatePostDto[key]
    })
    post.updated = new Date();

    return await this.postRepository.save(post);
  }

  async likePost(
    postId: string,
    user: User
  ): Promise<LikePost> {
    const post = await this.postRepository.findOne(postId);

    if (!post) {
      throw new NotFoundException(`Post with Id ${postId} not found`)
    }

    const likePost = await this.likePostRepository.findOne({ user, post }) || new LikePost();
    likePost.liked = !likePost.liked;
    likePost.user = user;
    likePost.post = post;
    const newLikePost = await this.likePostRepository.save(likePost);
    return await this.likePostRepository.findOne({
      post: newLikePost.post,
      user: user
    })
  }


  async getPosts(user?: User) {
    return await this.postRepository.getPosts(user);
  }
}
