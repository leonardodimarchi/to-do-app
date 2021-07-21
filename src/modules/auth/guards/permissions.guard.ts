import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) {

  }

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());

    if (!permissions)
      return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user)
      throw new UnauthorizedException('Você não possui permissão para acessar esta rota.');

    const hasRole = () => user.permissions.split('|').some(permission => permissions.includes(permission));

    if (user && user.permissions && hasRole())
      return true;

    throw new ForbiddenException('Você não possui permissão para acessar esta rota.');

  }
}
