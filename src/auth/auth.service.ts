import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto, LoginResponseDto, LoginUserDto } from './dto/login.dto';
import { RefreshTokenResponseDto } from './dto/refresh-token.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger();
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto): Promise<RegisterResponseDto> {
    const existing = await this.usersService.findByEmail(data.email);
    if (existing) throw new ConflictException('Email já cadastrado');
    const user = await this.usersService.create({
      email: data.email,
      name: data.name,
      password: data.password,
    });
    return {
      id: user.id,
      email: user.email || '',
      name: user.name || '',
    };
  }

  async validateUser(email: string, password: string) {
    return this.usersService.validateUser(email, password);
  }

  async login(user: User): Promise<LoginResponseDto> {
    const accessToken = this.jwtService.sign(user, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(user, { expiresIn: '7d' });
    const authenticatedUser: LoginUserDto = {
      id: user.id,
      email: user.email || '',
      name: user.name || '',
      image: user.image || '',
    };

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: authenticatedUser,
    };
  }

  async loginWithCredentials(dto: LoginDto): Promise<LoginResponseDto> {
    this.logger.debug(`Tentando login para o email: ${dto.email}`);
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !user.password) {
      this.logger.warn(`Usuário não encontrado ou sem senha: ${dto.email}`);
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      this.logger.warn(`Senha incorreta para o email: ${dto.email}`);
      throw new UnauthorizedException('Credenciais inválidas');
    }
    this.logger.log(`Login bem-sucedido para o usuário: ${user.id} (${user.email})`);
    return this.login(user);
  }

  async refreshToken(userId: string, refreshToken: string): Promise<RefreshTokenResponseDto> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      if (payload.sub !== userId) {
        throw new UnauthorizedException('Refresh token inválido');
      }
      const accessToken = this.jwtService.sign({ sub: payload.sub, email: payload.email }, { expiresIn: '15m' });
      const refreshTokenNew = this.jwtService.sign({ sub: payload.sub, email: payload.email }, { expiresIn: '7d' });
      return { access_token: accessToken, refresh_token: refreshTokenNew };
    } catch {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  async loginSocial(user: User, provider: string): Promise<LoginResponseDto> {
    // Aqui você pode adicionar lógica extra para diferentes provedores, se necessário
    // Por padrão, gera access/refresh token para o usuário autenticado pelo provider
    const accessToken = this.jwtService.sign(user, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(user, { expiresIn: '7d' });
    const authenticatedUser: LoginUserDto = {
      id: user.id,
      email: user.email || '',
      name: user.name || '',
      image: user.image || '',
    };
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: authenticatedUser,
    };
  }

  // Métodos para Google OAuth serão implementados na strategy
}
