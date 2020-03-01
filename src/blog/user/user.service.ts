import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UserRoles } from '../auth/enum/roles.enum';
import { UserStatus } from './enum/user-status.enum';
import { UserCredentailsDto } from './dto/user-credentails.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository, 'blog')
    private userRepository: UserRepository
  ) { }

  async signUp(userDto: UserCredentailsDto): Promise<any> {
    const user = await this.userRepository.signUp(userDto);
    const { password, salt, ...resp } = user;
    return resp;
  }
}
