import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'usuario@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senhaSegura123' })
  @IsNotEmpty()
  password: string;
}

export class LoginUserDto {
  @ApiProperty({ example: 'user_id' })
  id: string;

  @ApiProperty({ example: 'usuario@email.com' })
  email: string;

  @ApiProperty({ example: 'Nome do Usuário' })
  name: string;

  @ApiProperty({ example: 'https://...' })
  image?: string;
}

export class LoginResponseDto {
  @ApiProperty({ example: 'jwt_access_token' })
  access_token: string;

  @ApiProperty({ example: 'jwt_refresh_token' })
  refresh_token: string;

  @ApiProperty({ type: LoginUserDto })
  user: LoginUserDto;
}
