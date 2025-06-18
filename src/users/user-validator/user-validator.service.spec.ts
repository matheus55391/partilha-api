import { Test, TestingModule } from '@nestjs/testing';
import { UserValidatorService } from './user-validator.service';

describe('UserValidatorService', () => {
  let service: UserValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserValidatorService],
    }).compile();

    service = module.get<UserValidatorService>(UserValidatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
