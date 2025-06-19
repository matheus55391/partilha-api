import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { PrismaService } from '../database/prisma.service';

@Module({
  imports: [PassportModule],
  controllers: [GroupsController],
  providers: [GroupsService, PrismaService],
  exports: [GroupsService],
})
export class GroupsModule {}
