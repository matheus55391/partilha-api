import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: FastifyRequest = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'] as string;
    const token = authHeader?.split(' ')[1];
    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const payload = this.jwtService.verify<{
        sub: string;
        name: string;
        email: string;
      }>(token, { algorithms: ['HS256'] });

      const user = await this.prismaService.user.findUnique({
        where: { id: payload.sub },
      });
      if (!user) throw new UnauthorizedException('User not found');
      request.user = user;
      return true;
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
