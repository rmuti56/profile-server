import { Repository, EntityRepository } from "typeorm";
import { LikePost } from "./post-like.entity";
import { Post } from "./post.entity";
import { User } from "../user/user.entity";


@EntityRepository(LikePost)
export class LikePostRepository extends Repository<LikePost>{

  async likePost(
    user: User,
    post: Post
  ) {
    const likePost = await this.findOne({ user, post }) || new LikePost();
    likePost.liked = !likePost.liked;
    likePost.user = user;
    likePost.post = post;

    return await this.save(likePost);
  }

}