import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { User } from "../user/user.entity";
import { Post } from "../post/post.entity";
import { PostStatus } from "../post/enum/post-status.enum";
import { LikeComment } from "./comment-like.entity";


@Entity()
export class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  cid: number;

  @ManyToOne(type => User, { onUpdate: 'CASCADE', onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(type => Post, post => post.comments, { onUpdate: 'CASCADE', onDelete: 'CASCADE', eager: false })
  @JoinColumn({ name: "postId" })
  post: Post;

  @OneToMany(type => LikeComment, likeComment => likeComment.comment, { eager: false })
  likes: LikeComment[];

  @Column({ type: 'text', nullable: true })
  text: string;

  @Column({ type: 'text', nullable: true })
  imageComment: string;

  @Column({ type: 'varchar', length: 30, default: PostStatus.ACTIVE })
  status: PostStatus;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}