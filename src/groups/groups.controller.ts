import { Controller, Post, Body, Param, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { AddGroupMemberDto } from './dto/add-group-member.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

@ApiTags('groups')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async create(@Body() dto: CreateGroupDto, @Req() req: Request) {
    const userId = (req.user as any)?.id || (req.user as any)?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.groupsService.createGroup(dto, userId);
  }

  @Post(':groupId/members')
  async addMember(
    @Param('groupId') groupId: string,
    @Body() dto: AddGroupMemberDto,
    @Req() req: Request,
  ) {
    const userId = (req.user as any)?.id || (req.user as any)?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.groupsService.addMember(groupId, dto, userId);
  }
}
