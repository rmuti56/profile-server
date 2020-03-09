import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Column, OneToOne } from "typeorm";
import { User } from "../user/user.entity";
import { Comment } from "../comment/comment.entity";
import { Post } from "../post/post.entity";


@Entity()
export class NotificationComment extends BaseEntity {
  @PrimaryGeneratedColumn()
  ncid: number;

  @ManyToOne(type => User, { onUpdate: 'CASCADE', onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: 'boolean', default: true })
  unread: boolean;

  @OneToOne(type => Comment, { nullable: true })
  @JoinColumn({ name: 'commentId' })
  comment: Comment;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}