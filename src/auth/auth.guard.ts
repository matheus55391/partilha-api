import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Observable, firstValueFrom } from 'rxjs';

export class AuthGuard extends NestAuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = super.canActivate(context);
    if (result instanceof Promise) {
      return await result;
    }
    if (result instanceof Observable) {
      return await firstValueFrom(result) ?? false;
    }
    return Boolean(result);
  }

  handleRequest<TUser = User>(err: any, user: TUser): TUser {
    if (err || !user) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    return user;
  }
}
