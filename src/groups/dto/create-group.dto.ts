import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({
    description: 'Nome do grupo',
    example: 'Viagem para praia',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'URL da imagem do grupo',
    example: 'https://example.com/imagem-grupo.png',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
