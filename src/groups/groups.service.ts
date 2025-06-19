import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { AddGroupMemberDto } from './dto/add-group-member.dto';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async createGroup(createGroupDto: CreateGroupDto, creatorId: string) {
    // Cria o grupo e adiciona o criador como membro administrador
    const group = await this.prisma.group.create({
      data: {
        name: createGroupDto.name,
        imageUrl: createGroupDto.imageUrl,
        members: {
          create: {
            userId: creatorId,
            role: 'ADMIN',
          },
        },
      },
      include: { members: true },
    });
    return group;
  }

  async addMember(groupId: string, dto: AddGroupMemberDto, requesterId: string) {
    // Verifica se o requester é admin do grupo
    const member = await this.prisma.groupMember.findFirst({
      where: { groupId, userId: requesterId },
    });
    if (!member || member.role !== 'ADMIN') {
      throw new ForbiddenException('Apenas administradores podem adicionar membros');
    }
    // Adiciona novo membro
    return this.prisma.groupMember.create({
      data: {
        groupId,
        userId: dto.userId,
        role: 'MEMBER',
      },
    });
  }
}
