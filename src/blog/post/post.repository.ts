import { EntityRepository, Repository, Connection } from "typeorm";
import { Post } from "./post.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { User } from "../user/user.entity";
import { LikePost } from "./post-like.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LikePostRepository } from "./post-like.repository";
import { PostStatus } from "./enum/post-status.enum";

@EntityRepository(Post)
export class PostRepository extends Repository<Post>{
  constructor(
    @InjectRepository(LikePostRepository, 'blog')
    private likePostRepository: LikePostRepository
  ) { super() }

  async getMyPost(
    user: User,
    pid: number
  ): Promise<Post> {
    return await this.findOne({ user, pid });
  }

  async createPost(
    createPostDto: CreatePostDto,
    user: User
  ): Promise<Post> {
    const post = new Post();
    Object.keys(createPostDto).forEach(key => post[key] = createPostDto[key])
    post.user = user;
    return await this.save(post);
  }

  async getPosts(
    user?: User,
    skip = 0,
    take = 20
  ): Promise<Post[]> {

    let query = this.createQueryBuilder('post')

    if (user) {
      query.addSelect(subQuery => {
        return subQuery
          .select("COUNT(likes.userId)", "liked")
          .from(LikePost, "likes")
          .where('likes.userId = :userId', { userId: user.uid })
          .andWhere('likes.postId = post_pid')
      }, "isLiked")
    }

    query.leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect(subQuery => {
        return subQuery
          .select("likes.*")
          .from(LikePost, "likes")
          .addSelect('userLike.firstname', 'userLikeFirstName')
          .addSelect('userLike.lastName', 'userLikeLastName')
          .addSelect('userLike.uid', 'userLikeUid')
          .addSelect('userLike.imageProfile', 'userLikeImageProfile')
          .leftJoin('likes.user', 'userLike')
          .skip(0)
          .take(10)
      }, "likes", "likes.postId = post.pid and likes.liked=TRUE")
      .where('post.status = :status', { status: PostStatus.ACTIVE })
      .orderBy("post.pid", "DESC")
      .skip(skip)
      .take(take)

    // return await query.getQuery();
    const rawEntity = await query.getRawAndEntities();
    return this.margeRowEntity(rawEntity);

  }

  margeRowEntity(rawEntity): Post[] {
    let posts;
    let raws = rawEntity.raw;
    posts = rawEntity.entities;
    raws.forEach(raw => {
      if (raw.userLikeUid) {
        let likePost = {
          timestamp: raw.timestamp,
          user: {
            uid: raw.userLikeUid,
            firstname: raw.userLikeFirstName,
            lastname: raw.userLikeLastName,
            imageProfile: raw.userLikeImageProfile
          }
        }
        const post = posts.find(post => post.pid === raw.post_pid)
        post.isLiked = !!Number(raw.isLiked);
        if (post.likes) {
          post.likes.push(likePost)
        } else {
          post.likes = [likePost]
        }
      }
    })
    return posts;
  }

  filterLikes(posts: Post[], user?: User): Post[] {
    return posts.map(post => {
      // if (user)
      //   post.isLiked = post.likes.some(like => like?.user?.uid === user?.uid);
      post.likes = post.likes.filter(like => like.liked);
      return post;
    })
  }

}