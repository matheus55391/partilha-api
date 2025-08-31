import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../../test/prisma.mock';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  const mockUsersService = { create: jest.fn() };
  const mockJwtService = { sign: jest.fn().mockReturnValue('signed-token') };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    const dto = { email: 'a@b.com', password: 'plain' };

    it('should return token when credentials are valid', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'u1',
        password: 'hashed',
      });
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

      const res = await service.login(dto as any);

      expect(res).toEqual({ token: 'signed-token' });
      expect(mockJwtService.sign).toHaveBeenCalledWith({ userId: 'u1' });
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: dto.email },
      });
    });

    it('should throw if user not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(service.login(dto as any)).rejects.toThrow(
        'Invalid credentials',
      );
    });

    it('should throw if password invalid', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'u1',
        password: 'hashed',
      });
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

      await expect(service.login(dto as any)).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('register', () => {
    it('should create a user and return token', async () => {
      const createDto = { name: 'A', email: 'a@b.com', password: 'plain' };
      jest.spyOn(bcrypt, 'hashSync').mockReturnValue('hashed-pass');
      mockUsersService.create.mockResolvedValue({ id: 'u2' });

      const res = await service.register(createDto as any);

      expect(mockUsersService.create).toHaveBeenCalledWith({
        ...createDto,
        password: 'hashed-pass',
      });
      expect(mockJwtService.sign).toHaveBeenCalledWith({ userId: 'u2' });
      expect(res).toEqual({ token: 'signed-token' });
    });
  });
});
