import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToOne, Column } from "typeorm";
import { User } from "../user/user.entity";
import { NotificationComment } from "./notification-comment.entity";
import { NotificationLike } from "./notification-like.entity";
import { ENotiType } from "./enum/notification-type.enum";


@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  nid: number;

  @OneToOne(type => NotificationComment, { nullable: true, eager: true })
  @JoinColumn({ name: 'notiCommentId' })
  notiComment: NotificationComment;

  @OneToOne(type => NotificationLike, { nullable: true, eager: true })
  @JoinColumn({ name: 'notiLikeId' })
  notiLike: NotificationLike;

  @ManyToOne(type => User, { onUpdate: 'CASCADE', onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: "recipientId" })
  recipient: User;

  @Column({ type: 'varchar', length: 30 })
  notiType: ENotiType;


  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}