import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockedCrudRequest } from '../../../../test/mock-crud-request';
import { mockedAdminUser, mockedUser } from '../../../../test/mock-user';
import { MockRepository } from '../../../../test/mock.repository';
import { UserEntity } from '../entities/user.entity';
import { CreateUserPayload } from '../models/create-user.payload';
import { UpdateUserPayload } from '../models/update-user.payload';
import { UserService } from './user.service';

describe('UserService', () => {
  let provider: UserService;
  let repository: MockRepository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: MockRepository,
        }
      ],
    }).compile();

    provider = module.get<UserService>(UserService);
    repository = module.get<MockRepository<UserEntity>>(getRepositoryToken(UserEntity))
  });

  it('Should initialize (Be defined)', () => {
    expect(provider).toBeDefined();
  });

  describe('List many', () => {
    it ('should return many items if user has admin permissions', () => {
      const tasks = provider.listMany(mockedAdminUser, mockedCrudRequest);
      expect(tasks).toBeDefined();
    });

    it ('should throw an ForbiddenException if the user does not have admin permissions', async () => {
      try {
        await provider.listMany(mockedUser,mockedCrudRequest)
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
      }
    });
  });
});
