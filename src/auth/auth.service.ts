import { MailerService } from '@nestjs-modules/mailer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { Cache } from 'cache-manager';
import { randomUUID } from 'crypto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private mailerService: MailerService,
  ) {}

  async login(loginDto: LoginDto) {
    const cacheKey = `user:${loginDto.email}`;
    let user = await this.cacheManager.get<User>(cacheKey);
    if (!user) {
      const foundUser = await this.prismaService.user.findUnique({
        where: { email: loginDto.email },
      });
      if (!foundUser) throw new Error('Invalid credentials');
      user = foundUser;
      await this.cacheManager.set(cacheKey, user, 300);
    }
    const isPasswordValid = bcrypt.compareSync(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) throw new Error('Invalid credentials');
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      name: user.name,
    });
    return { access_token: token };
  }

  async register(registerDto: CreateUserDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }
    const hashedPassword = bcrypt.hashSync(registerDto.password, 10);
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    await this.cacheManager.set(`user:${user.email}`, user, 300);
    return { user };
  }

  async requestPasswordReset(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');
    const token = randomUUID();
    await this.cacheManager.set(`pwd-reset:${token}`, user.id, 600000);
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset your password',
      text: `Use this token to reset your password: ${token}`,
    });
    return { message: 'Password reset email sent' };
  }

  async resetPassword(token: string, newPassword: string) {
    const userId = await this.cacheManager.get<string>(`pwd-reset:${token}`);
    if (!userId) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    await this.cacheManager.del(`pwd-reset:${token}`);
    await this.cacheManager.del(`user:${user.email}`);

    return { message: 'Senha atualizada com sucesso' };
  }
}
