// expenses.entity.ts

import { ParticipantDto } from 'src/expenses/dto/participant.dto';

export class ExpenseEntity {
  id: string;
  description: string;
  amount: number;
  paymentDate: Date;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  participants: ParticipantDto[];
}
