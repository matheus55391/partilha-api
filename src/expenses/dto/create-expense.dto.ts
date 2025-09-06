import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ParticipantDto } from './participant.dto';

export class CreateExpenseDto {
  @ApiProperty({ description: 'Descrição da despesa' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Valor total da despesa' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Data do pagamento' })
  @IsDateString()
  paymentDate: string;

  @ApiProperty({
    type: ParticipantDto,
    isArray: true,
    description: 'Lista de participantes da despesa',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParticipantDto)
  participants: ParticipantDto[];

  @ApiProperty({
    description: 'ID do usuário que criou a despesa',
    example: 'cuid-123abc',
  })
  @IsString()
  @IsNotEmpty()
  createdById: string;
}
