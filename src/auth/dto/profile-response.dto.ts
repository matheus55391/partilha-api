import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiProperty({ example: 'user_id' })
  id: string;

  @ApiProperty({ example: 'usuario@email.com' })
  email: string;

  @ApiProperty({ example: 'Nome do Usuário' })
  name: string;

  @ApiProperty({ example: 'https://...' })
  image?: string;

  @ApiProperty({ example: '2025-06-22T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-06-22T00:00:00.000Z' })
  updatedAt: Date;
}
