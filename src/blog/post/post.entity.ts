import {
  BaseEntity, PrimaryGeneratedColumn, Entity, Column,
  CreateDateColumn, ManyToOne, JoinColumn, OneToMany, RelationCount, RelationId
} from "typeorm";
import { PostStatus } from "./enum/post-status.enum";
import { User } from "../user/user.entity";
import { LikePost } from "./post-like.entity";
import { Comment } from '../comment/comment.entity'


@Entity()
export class Post extends BaseEntity {

  @PrimaryGeneratedColumn()
  pid: number;

  @ManyToOne(type => User, user => user.posts, { eager: true })
  @JoinColumn({ name: "userId" })
  user: User

  @OneToMany(type => LikePost, likePost => likePost.post, { eager: false })
  likes: LikePost[]

  @RelationCount((post: Post) => post.likes, 'like',
    qb => qb.andWhere('like.liked = :liked', { liked: true }))
  likeCount: number;

  @OneToMany(type => Comment, comment => comment.post, { eager: false })
  comments: Comment[]

  @RelationCount((post: Post) => post.comments, 'comment',
    qb => qb.where('comment.status = :status', { status: PostStatus.ACTIVE })
  )
  commentCount: number;

  @Column({ type: 'text' })
  textHtml: string;

  @Column({ type: 'varchar', length: 512 })
  title: string;

  @Column({ type: 'text', nullable: true })
  imageTitlePath: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  description: string

  @Column({ type: 'varchar', length: 64, nullable: true })
  category: string;

  @Column({ type: 'int', default: 0 })
  view: number;

  @Column({ type: 'varchar', length: 30, default: PostStatus.ACTIVE })
  status: PostStatus

  @Column("timestamp", { precision: 3, default: () => "CURRENT_TIMESTAMP(3)" })
  lastReaded: Date

  @CreateDateColumn()
  created: Date

  @Column("timestamp", { precision: 3, default: () => "CURRENT_TIMESTAMP(3)" })
  updated: Date

  @Column("timestamp", { precision: 3, default: () => "CURRENT_TIMESTAMP(3)", onUpdate: "CURRENT_TIMESTAMP(3)" })
  timestamp: Date

  isLiked?: boolean;




}