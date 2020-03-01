import { ReflectMetadata } from "@nestjs/common";
import { UserRoles } from "./enum/roles.enum";

export const Roles = (...roles: UserRoles[]) => ReflectMetadata('roles', roles);