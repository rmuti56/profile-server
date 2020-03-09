import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Column, OneToOne } from "typeorm";
import { User } from "../user/user.entity";
import { ENotiLike } from "./enum/notification-like.enum"
import { Post } from '../post/post.entity'
import { Comment } from "../comment/comment.entity";

@Entity()
export class NotificationLike extends BaseEntity {
  @PrimaryGeneratedColumn()
  nlid: number;

  @ManyToOne(type => User, { onUpdate: 'CASCADE', onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: 'boolean', default: true })
  unread: boolean;

  @Column({ type: 'varchar', length: 30 })
  typeLike: ENotiLike;

  @OneToOne(type => Comment, { nullable: true })
  @JoinColumn({ name: 'commentId' })
  comment: Comment;


  @OneToOne(type => Post, { nullable: true })
  @JoinColumn({ name: 'postId' })
  post: Post;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}