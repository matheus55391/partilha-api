import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ example: 'user_id' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'refresh_token_jwt' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class RefreshTokenResponseDto {
  @ApiProperty({ example: 'jwt_access_token' })
  access_token: string;
}
