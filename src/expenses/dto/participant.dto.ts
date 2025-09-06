import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class ParticipantDto {
  @ApiProperty({ description: 'ID do usuário registrado', required: false })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({ description: 'ID do contato guest', required: false })
  @IsOptional()
  @IsString()
  contactId?: string;

  @ApiProperty({ description: 'Valor que este participante deve pagar' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Indica se o participante foi quem pagou' })
  @IsBoolean()
  isPayer: boolean;
}
