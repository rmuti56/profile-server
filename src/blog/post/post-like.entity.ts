import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, ManyToOne, JoinColumn, PrimaryColumn, Index } from "typeorm";
import { User } from "../user/user.entity";
import { Post } from "./post.entity";


@Entity()
@Index(['user', 'post'])
export class LikePost extends BaseEntity {

  @ManyToOne(type => User, { onUpdate: 'CASCADE', onDelete: 'CASCADE', primary: true, eager: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(type => Post, post => post.likes, { onUpdate: 'CASCADE', onDelete: 'CASCADE', primary: true, eager: false })
  @JoinColumn({ name: "postId" })
  post: Post

  @Column({ type: 'boolean', default: true })
  liked: boolean;

  @CreateDateColumn()
  created: Date

  @Column("timestamp", { precision: 3, default: () => "CURRENT_TIMESTAMP(3)", onUpdate: "CURRENT_TIMESTAMP(3)" })
  timestamp: Date

}