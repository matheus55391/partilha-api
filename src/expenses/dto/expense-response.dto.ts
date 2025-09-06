import { ApiProperty } from '@nestjs/swagger';
import { ParticipantDto } from './participant.dto';

export class ExpenseResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  paymentDate: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  createdById: string;

  @ApiProperty({ type: ParticipantDto, isArray: true })
  participants: ParticipantDto[];
}
