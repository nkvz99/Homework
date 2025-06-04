import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/common/types/role.enum";
import { ROLES_KEY } from 'src/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}
    canActivate(context: ExecutionContext) : boolean | Promise<boolean>{
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[
            context.getHandler(),
            context.getClass(),
        ])
        if (!requiredRoles) {
            return true; // If no roles are required, allow access
        }
        const {user} = context.switchToHttp().getRequest();
        return requiredRoles.includes(user.role)
    }
}