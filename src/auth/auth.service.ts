import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { LoginDto } from 'src/auth/dto/login.dto';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private getUserCacheKey(email: string) {
    return `user:${email}`;
  }

  async login(loginDto: LoginDto) {
    const cacheKey = this.getUserCacheKey(loginDto.email);
    let user = await this.cacheManager.get<User>(cacheKey);

    if (!user) {
      const foundUser = await this.usersService.findByEmail(loginDto.email);
      if (!foundUser) throw new BadRequestException('Credenciais inválidas');
      user = foundUser;
      await this.cacheManager.set(cacheKey, user, 300);
    }

    const isPasswordValid = bcrypt.compareSync(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid)
      throw new BadRequestException('Credenciais inválidas');

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      name: user.name,
    });

    return { access_token: token };
  }

  async register(registerDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }

    const user = await this.usersService.create(registerDto);

    await this.cacheManager.set(this.getUserCacheKey(user.email), user, 300);
    return { user };
  }

  async requestPasswordReset(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    await this.mailService.sendToken(user.id, email);
    return { message: 'Email de redefinição de senha enviado' };
  }

  async resetPassword(token: string, newPassword: string) {
    const userId = await this.cacheManager.get<string>(`pwd-reset:${token}`);
    if (!userId) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const user = await this.usersService.updatePassword(userId, hashedPassword);

    // limpar cache
    await this.cacheManager.del(`pwd-reset:${token}`);
    await this.cacheManager.del(this.getUserCacheKey(user.email));

    return { message: 'Senha atualizada com sucesso' };
  }
}
