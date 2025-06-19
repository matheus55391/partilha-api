import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RefreshTokenDto, RefreshTokenResponseDto } from './dto/refresh-token.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Cadastro de usuário' })
  @ApiResponse({ status: 201, description: 'Usuário cadastrado com sucesso.', type: RegisterResponseDto })
  @ApiBody({ type: RegisterDto })
  async register(@Body() dto: RegisterDto): Promise<RegisterResponseDto> {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login com email e senha' })
  @ApiResponse({ status: 201, description: 'Login realizado com sucesso.', type: LoginResponseDto })
  @ApiBody({ type: LoginDto })
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.loginWithCredentials(dto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Renova o access token usando refresh token' })
  @ApiResponse({ status: 201, description: 'Novo access token gerado.', type: RefreshTokenResponseDto })
  @ApiBody({ type: RefreshTokenDto })
  async refresh(@Body() dto: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
    return this.authService.refreshToken(dto.userId, dto.refreshToken);
  }

  @Get(':provider')
  @ApiOperation({ summary: 'Login social (Google, Facebook, etc)' })
  @ApiParam({ name: 'provider', example: 'google', description: 'Nome do provedor OAuth (google, facebook, github, etc)' })
  @UseGuards(AuthGuard())
  async socialLogin(@Param('provider') provider: string) {
    // Redireciona para o provedor OAuth
  }

  // @Get(':provider/callback')
  // @ApiOperation({ summary: 'Callback do login social' })
  // @ApiParam({ name: 'provider', example: 'google', description: 'Nome do provedor OAuth (google, facebook, github, etc)' })
  // @UseGuards(AuthGuard())
  // async socialCallback(@Param('provider') provider: string, @Req() req: Request): Promise<LoginResponseDto> {
  //   return this.authService.loginSocial(req.user, provider);
  // }
}
