import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, ManyToOne, JoinColumn, PrimaryColumn, Index } from "typeorm";
import { User } from "../user/user.entity";
import { Comment } from "./comment.entity";


@Entity()
@Index(['user', 'comment'])
export class LikeComment extends BaseEntity {

  @ManyToOne(type => User, { onUpdate: 'CASCADE', onDelete: 'CASCADE', primary: true, eager: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(type => Comment, comment => comment.likes, { onUpdate: 'CASCADE', onDelete: 'CASCADE', primary: true, eager: true })
  @JoinColumn({ name: "commentId" })
  comment: Comment

  @Column({ type: 'boolean', default: true })
  liked: boolean;

  @CreateDateColumn({ select: false })
  created: Date

  @Column("timestamp", { precision: 3, default: () => "CURRENT_TIMESTAMP(3)", onUpdate: "CURRENT_TIMESTAMP(3)" })
  timestamp: Date

}