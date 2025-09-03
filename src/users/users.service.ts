import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
 constructor(
    private prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
    const newUser = await this.prismaService.user.create({
      data: { ...createUserDto, password: hashedPassword },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });
    await this.cacheManager.del('users:all');
    return newUser;
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const cacheKey = 'users:all';
    const cached = await this.cacheManager.get<Omit<User, 'password'>[]>(cacheKey);
    if (cached) return cached;

    const users = await this.prismaService.user.findMany({
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });

    await this.cacheManager.set(cacheKey, users, 60);
    return users;
  }

  async findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string) {
    return this.prismaService.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
