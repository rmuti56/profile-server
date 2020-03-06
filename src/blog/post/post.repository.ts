import { EntityRepository, Repository } from "typeorm";
import { Post } from "./post.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { User } from "../user/user.entity";

@EntityRepository(Post)
export class PostRepository extends Repository<Post>{

  async createPost(
    createPostDto: CreatePostDto,
    user: User
  ): Promise<Post> {
    const post = new Post();
    Object.keys(createPostDto).forEach(key => post[key] = createPostDto[key])
    post.user = user;
    return await this.save(post);
  }

}