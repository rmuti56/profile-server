import { Entity, BaseEntity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt'

import { UserRoles } from "../auth/enum/roles.enum";
import { UserStatus } from "./enum/user-status.enum";
import { UserProvider } from "./enum/user.provider.enum";
import { Post } from "../post/post.entity";



@Entity()
@Unique(['username'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  uid: number

  @OneToMany(type => Post, post => post.user, { eager: false })
  posts: Post[]

  @Column({ type: 'varchar', length: 50 })
  username: string

  @Column({ type: 'varchar', length: 512, nullable: true })
  password: string

  @Column({ type: 'varchar', length: 30, nullable: true })
  firstname: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  lastname: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;

  @Column({ type: 'tinyint', width: 3, select: false })
  status: UserStatus

  @Column({ type: 'text', nullable: true })
  imageProfile: string;


  @Column({ type: 'varchar', length: 64, select: false })
  roles: UserRoles;

  @Column({ type: 'varchar', length: 64, default: UserProvider.local })
  provider: UserProvider;

  @Column({ type: 'varchar', length: 255, nullable: true, select: false })
  salt: string

  @Column({ type: 'varchar', length: 512, nullable: true, select: false })
  accessToken: string

  @Column({ type: 'varchar', length: 512, nullable: true, select: false })
  refreshToken: string

  @CreateDateColumn()
  created: Date

  @Column("timestamp", { precision: 3, default: () => "CURRENT_TIMESTAMP(3)", onUpdate: "CURRENT_TIMESTAMP(3)" })
  updated: Date

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}