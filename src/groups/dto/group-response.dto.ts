import { ApiProperty } from '@nestjs/swagger';

export class GroupResponseDto {
  @ApiProperty({ example: 'group_id' })
  id: string;

  @ApiProperty({ example: 'Nome do Grupo' })
  name: string;

  @ApiProperty({ example: 'https://...' })
  imageUrl?: string;

  @ApiProperty({ example: '2025-06-22T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-06-22T00:00:00.000Z' })
  updatedAt: Date;
}
