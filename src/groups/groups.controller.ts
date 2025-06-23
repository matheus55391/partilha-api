import { Controller, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { AddGroupMemberDto } from './dto/add-group-member.dto';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { GroupResponseDto } from './dto/group-response.dto';
import { User } from '@prisma/client';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Cria um novo grupo' })
  @ApiBody({ type: CreateGroupDto })
  @ApiResponse({ status: 201, description: 'Grupo criado com sucesso.', type: GroupResponseDto })
  async create(@Body() dto: CreateGroupDto, @Req() req: Request): Promise<GroupResponseDto> {
    const user = req.user as User;
    const group = await this.groupsService.createGroup(dto, user.id);
    return {
      id: group.id,
      name: group.name,
      imageUrl: group.imageUrl ?? undefined,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post(':groupId/members')
  @ApiOperation({ summary: 'Adiciona um membro ao grupo' })
  @ApiBody({ type: AddGroupMemberDto })
  @ApiResponse({ status: 201, description: 'Membro adicionado com sucesso.' })
  async addMember(
    @Param('groupId') groupId: string,
    @Body() dto: AddGroupMemberDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.groupsService.addMember(groupId, dto, user.id);
  }
}
