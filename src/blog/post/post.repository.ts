import { EntityRepository, Repository, Connection } from "typeorm";
import { Post } from "./post.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { User } from "../user/user.entity";
import { LikePost } from "./post-like.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LikePostRepository } from "./post-like.repository";

@EntityRepository(Post)
export class PostRepository extends Repository<Post>{
  constructor(
    @InjectRepository(LikePostRepository, 'blog')
    private likePostRepository: LikePostRepository
  ) { super() }

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
    user?: User
  ): Promise<any> {
    let posts: Post[];
    // if (!user) {
    //   posts = await this.find({ skip: 0, take: 10 })
    //   return this.filterLikes(posts);
    // }

    // .getQuery();
    let query = this.createQueryBuilder('post')
      .addSelect(subQuery => {
        return subQuery
          .select("COUNT(likes.userId)", "liked")
          .from(LikePost, "likes")
          .where('likes.userId = :userId', { userId: user.uid })
          .andWhere('likes.postId = post_pid')
      }, "isLiked")
      .leftJoinAndSelect('post.user', 'user')
      //.leftJoinAndSelect('post.likes', 'likes', 'likes.liked = TRUE')
      .leftJoinAndSelect(subQuery => {
        return subQuery
          .select("likes.*")
          .from(LikePost, "likes")
          .addSelect('userLike.firstname', 'userLikeFirstName')
          .addSelect('userLike.lastName', 'userLikeLastName')
          .addSelect('userLike.uid', 'userLikeUid')
          .addSelect('userLike.imageProfile', 'userLikeImageProfile')
          .leftJoin('likes.user', 'userLike')
          // .select('userLike')
          // .from(User, 'userLike')
          // .where('userLike.uid = likes.userId')
          //  .leftJoinAndSelect('likes.user', 'userLike')
          .limit(10)
      }, "likes", "likes.postId = post.pid")

    // return await query.getQuery();
    const rowEntity = await query.getRawAndEntities();
    return this.margeRowEntity(rowEntity);
    // let query = this.createQueryBuilder('post')
    //   .leftJoinAndSelect('post.user', 'user')
    //   .addSelect(`(${subQuery})`, "isLiked")
    //   .having("post.title = :title", { title: "test title post first post" })
    // .leftJoinAndMapMany(
    //   "post.likes",
    //   qb => qb.from(LikePost, "likes"),
    //   "likes",
    //   "likes.userId = :userId", { userId: user.uid })

    // return await query.getMany();


    // var manager = this.createQueryBuilder("tipos_derechos")
    //   .leftJoinAndSelect('tipos_derechos.derechos', 'derechos')
    //.loadRelationCountAndMap('tipos_derechos.derechos_count', 'tipos_derechos.derechos')
    // posts = await this.find({
    //   order: {
    //     pid: 'DESC'
    //   },
    // });

    // return this.filterLikes(posts, user);
  }

  margeRowEntity(rowEntity): Post[] {
    let posts: Post[]
    let rows = rowEntity.rows;
    posts = rowEntity.entities;
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