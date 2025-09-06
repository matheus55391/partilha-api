// expenses.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ExpenseResponseDto } from 'src/expenses/dto/expense-response.dto';

@ApiTags('expenses')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new expense' })
  @ApiResponse({
    status: 201,
    description: 'Expense created successfully',
    type: ExpenseResponseDto,
  })
  createExpense(@Body() dto: CreateExpenseDto) {
    return this.expensesService.createExpense(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all expenses' })
  @ApiResponse({
    status: 200,
    description: 'List of expenses',
    type: [ExpenseResponseDto],
  })
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single expense by ID' })
  @ApiResponse({
    status: 200,
    description: 'Expense details',
    type: ExpenseResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an expense by ID' })
  @ApiResponse({
    status: 200,
    description: 'Expense updated successfully',
    type: ExpenseResponseDto,
  })
  update(@Param('id') id: string, @Body() dto: UpdateExpenseDto) {
    return this.expensesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an expense by ID' })
  @ApiResponse({
    status: 200,
    description: 'Expense deleted successfully',
    type: ExpenseResponseDto,
  })
  remove(@Param('id') id: string) {
    return this.expensesService.remove(id);
  }
}
