import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { PostStatus } from "./enum/post-status.enum";
import { User } from "../user/user.entity";


@Entity()
export class Post extends BaseEntity {

  @PrimaryGeneratedColumn()
  pid: number;

  @ManyToOne(type => User, user => user.posts, { eager: true })
  @JoinColumn({ name: "userId" })
  user: User

  @Column({ type: 'text' })
  textHtml: string;

  @Column({ type: 'varchar', length: 512 })
  title: string;

  @Column({ type: 'varchar', length: 64 })
  category: string;

  @Column({ type: 'int' })
  view: number;

  @Column({ type: 'varchar', length: 30 })
  status: PostStatus

  @Column("timestamp", { precision: 3, default: () => "CURRENT_TIMESTAMP(3)" })
  lastReaded: Date

  @CreateDateColumn()
  created: Date

  @Column("timestamp", { precision: 3, default: () => "CURRENT_TIMESTAMP(3)" })
  updated: Date

  @Column("timestamp", { precision: 3, default: () => "CURRENT_TIMESTAMP(3)", onUpdate: "CURRENT_TIMESTAMP(3)" })
  timestamp: Date



}