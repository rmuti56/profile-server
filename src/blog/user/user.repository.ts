import { EntityRepository, Repository, getRepository } from "typeorm";
import * as bcrypt from 'bcrypt'


import { User } from './user.entity'
import { UserRule } from "../auth/enum/rule.enum";
import { UserStatus } from "./enum/user-status.enum";
import { UserCredentailsDto } from "./dto/user-credentails.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";


@EntityRepository(User)
export class UserRepository extends Repository<User>{

  async signUp(userDto: UserCredentailsDto): Promise<User> {
    const user = new User();
    user.username = userDto.username;
    user.firstname = userDto.firstname;
    user.lastname = userDto.lastname;
    user.email = userDto.email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(userDto.password, user.salt);
    user.rule = UserRule.USER;
    user.status = UserStatus.ACTIVE;
    try {
      return await this.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException(error.name || error.code || error.message);
      }
    }

  }

  private async hashPassword(password: string, salt: string) {
    return await bcrypt.hash(password, salt);
  }
}