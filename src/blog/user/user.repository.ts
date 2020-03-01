import { EntityRepository, Repository, getRepository } from "typeorm";
import * as bcrypt from 'bcrypt'


import { User } from './user.entity'
import { UserRoles } from "../auth/enum/roles.enum";
import { UserStatus } from "./enum/user-status.enum";
import { UserCredentailsDto } from "./dto/user-credentails.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { UserSigninDto } from "../auth/dto/user-signin.dto";


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
    user.roles = UserRoles.USER;
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

  async validateUserPassword(userSigninDto: UserSigninDto): Promise<User> {
    const { username, password } = userSigninDto;
    const user = await this.findOne({ username })

    if (user && await user.validatePassword(password)) {
      return user
    } else {
      return null
    }
  }

  async createUserByFackBook(fackbookProfileDto): Promise<User> {
    const user = new User();
    user.username = `facebook${fackbookProfileDto.id}`;
    user.email = fackbookProfileDto.emails[0]?.value;
    user.firstname = fackbookProfileDto.name?.firstname;
    user.lastname = fackbookProfileDto.name?.lastname;
    user.imageProfile = fackbookProfileDto.photos[0]?.value;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(fackbookProfileDto.id, user.salt);
    user.roles = UserRoles.USER;
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