import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../../test/prisma.mock';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user and not return the password', async () => {
      const dto = { name: 'Matheus', email: 'test@test.com', password: '123' };

      prismaMock.user.create.mockResolvedValue({
        id: 'abc123',
        name: dto.name,
        email: dto.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.create(dto);

      expect(result).toHaveProperty('id');
      expect(result.email).toBe(dto.email);
      expect(result).not.toHaveProperty('password');
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: dto,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return all users without password', async () => {
      const users = [
        {
          id: '1',
          name: 'A',
          email: 'a@test.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'B',
          email: 'b@test.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      prismaMock.user.findMany.mockResolvedValue(users);

      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(result[0]).not.toHaveProperty('password');
      expect(prismaMock.user.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return one user by id without password', async () => {
      const user = {
        id: '1',
        name: 'A',
        email: 'a@test.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.user.findUnique.mockResolvedValue(user);

      const result = await service.findOne('1');

      expect(result).toEqual(user);
      expect(result).not.toHaveProperty('password');
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        select: expect.any(Object), // garante que select foi usado
      });
    });
  });

  describe('update', () => {
    it('should update a user and not return password', async () => {
      const update = { name: 'Novo Nome' };
      const user = {
        id: '1',
        name: 'Novo Nome',
        email: 'a@test.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.user.update.mockResolvedValue(user);

      const result = await service.update('1', update);

      expect(result.name).toBe(update.name);
      expect(result).not.toHaveProperty('password');
      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: update,
        select: expect.any(Object),
      });
    });
  });

  describe('remove', () => {
    it('should delete a user and not return password', async () => {
      const user = {
        id: '1',
        name: 'A',
        email: 'a@test.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.user.delete.mockResolvedValue(user);

      const result = await service.remove('1');

      expect(result).toEqual(user);
      expect(result).not.toHaveProperty('password');
      expect(prismaMock.user.delete).toHaveBeenCalledWith({
        where: { id: '1' },
        select: expect.any(Object),
      });
    });
  });
});
