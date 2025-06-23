import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../database/prisma.service';
import { UserValidatorService } from './user-validator/user-validator.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, PrismaService, UserValidatorService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
