// expenses.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class ExpensesService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createExpense(dto: CreateExpenseDto): Promise<Expense> {
    const expense = await this.prisma.expense.create({
      data: {
        description: dto.description,
        amount: dto.amount,
        paymentDate: new Date(dto.paymentDate),
        createdById: dto.createdById,
        participants: {
          create: dto.participants.map((p) => ({
            userId: p.userId ?? null,
            contactId: p.contactId ?? null,
            amount: p.amount,
            isPayer: p.isPayer,
          })),
        },
      },
      include: { participants: true },
    });

    await this.cacheManager.del('expenses:all');
    return expense;
  }

  async findAll(): Promise<Expense[]> {
    const cacheKey = 'expenses:all';
    const cached = await this.cacheManager.get<Expense[]>(cacheKey);
    if (cached) return cached;

    const expenses = await this.prisma.expense.findMany({
      include: { participants: true },
    });

    await this.cacheManager.set(cacheKey, expenses, 60);
    return expenses;
  }

  async findOne(id: string): Promise<Expense> {
    const cacheKey = `expense:${id}`;
    const cached = await this.cacheManager.get<Expense>(cacheKey);
    if (cached) return cached;

    const expense = await this.prisma.expense.findUnique({
      where: { id },
      include: { participants: true },
    });
    if (!expense) throw new NotFoundException('Expense not found');

    await this.cacheManager.set(cacheKey, expense, 60);
    return expense;
  }

  async update(id: string, dto: UpdateExpenseDto): Promise<Expense> {
    const expense = await this.prisma.expense.update({
      where: { id },
      data: {
        description: dto.description,
        amount: dto.amount,
        paymentDate: dto.paymentDate ? new Date(dto.paymentDate) : undefined,
        participants: dto.participants
          ? {
              deleteMany: {},
              create: dto.participants.map((p) => ({
                userId: p.userId ?? null,
                contactId: p.contactId ?? null,
                amount: p.amount,
                isPayer: p.isPayer,
              })),
            }
          : undefined,
      },
      include: { participants: true },
    });

    await this.cacheManager.del(`expense:${id}`);
    await this.cacheManager.del('expenses:all');
    return expense;
  }

  async remove(id: string): Promise<Expense> {
    const expense = await this.prisma.expense.delete({
      where: { id },
      include: { participants: true },
    });

    await this.cacheManager.del(`expense:${id}`);
    await this.cacheManager.del('expenses:all');
    return expense;
  }
}
