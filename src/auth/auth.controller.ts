import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';
import { ResetPasswordDto } from 'src/auth/dto/request-password-dto';
import { RequestPasswordResetDto } from 'src/auth/dto/request-password-reset-dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login do usuário' })
  @ApiResponse({ status: 201, description: 'Token JWT gerado com sucesso' })
  @ApiBody({ type: LoginDto })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiBody({ type: CreateUserDto })
  register(@Body() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }

  @Post('request-password-reset')
  @ApiOperation({ summary: 'Solicitar reset de senha via email' })
  @ApiResponse({
    status: 201,
    description: 'Email de reset enviado com sucesso',
  })
  @ApiBody({ type: RequestPasswordResetDto })
  requestPasswordReset(@Body() body: RequestPasswordResetDto) {
    return this.authService.requestPasswordReset(body.email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Resetar senha usando token' })
  @ApiResponse({ status: 201, description: 'Senha atualizada com sucesso' })
  @ApiBody({ type: ResetPasswordDto })
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body.token, body.newPassword);
  }
}
