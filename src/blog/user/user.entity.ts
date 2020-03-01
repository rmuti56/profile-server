import { Entity, BaseEntity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

import { UserRoles } from "../auth/enum/roles.enum";
import { UserStatus } from "./enum/user-status.enum";


@Entity()
@Unique(['username'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  uid: number

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

  @Column({ type: 'tinyint', width: 3 })
  status: UserStatus

  @Column({ type: 'text', nullable: true })
  imageProfile: string;

  @Column()

  @Column({ type: 'varchar', length: 64 })
  roles: UserRoles;

  @Column({ type: 'varchar', length: 255, nullable: true })
  salt: string

  @Column({ type: 'varchar', length: 512, nullable: true })
  accessToken: string

  @Column({ type: 'varchar', length: 512, nullable: true })
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