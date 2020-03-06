import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/user.entity';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository, 'blog')
    private postRepository: PostRepository
  ) { }

  async createPost(
    createPostDto: CreatePostDto,
    user: User
  ): Promise<Post> {
    return await this.postRepository.createPost(createPostDto, user);
  }
}
