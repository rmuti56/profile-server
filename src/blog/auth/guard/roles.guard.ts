import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRoles } from "../enum/roles.enum";
import { User } from "src/blog/user/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRoles[]>('roles', context.getHandler()) || this.reflector.get<UserRoles[]>('roles', context.getClass());
    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    const hasRole = () => roles.includes(user.roles)

    if (user && user.roles && hasRole()) {
      return true;
    }

    throw new ForbiddenException('You do not have permission (Roles)');
    //throw new HttpException('You do not have permission (Roles)', HttpStatus.UNAUTHORIZED);

  }
}