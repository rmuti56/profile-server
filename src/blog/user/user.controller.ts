import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from './user.entity';
import { Roles } from '../auth/roles.decorator';
import { UserRoles } from '../auth/enum/roles.enum';
import { RolesGuard } from '../auth/guard/roles.guard';
import { prefixApi } from 'src/configs/constant.config';

@Controller(`${prefixApi}user`)
export class UserController {

  @Get()
  @Roles(UserRoles.ADMIN, UserRoles.SUPERUSER, UserRoles.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getUser(
    @GetUser() user: User
  ) {
    return user
  }
}
