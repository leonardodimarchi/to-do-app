import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockedCrudRequest } from '../../../../test/mock-crud-request';
import { mockedAdminUser, mockedUser } from '../../../../test/mock-user';
import { MockRepository } from '../../../../test/mock.repository';
import { TaskEntity } from '../entities/task.entity';
import { CreateTaskPayload } from '../models/create-task.payload';
import { UpdateTaskPayload } from '../models/update-task.payload';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let provider: TaskService;
  let repository: MockRepository<TaskEntity>;

  const mockTaskEntity: TaskEntity = {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 1,
    isActive: true,
    groupId: 1,
    content: '',
    isDone: false,
    toProxy: jest.fn(),
    save: jest.fn(),
    hasId: jest.fn(),
    recover: jest.fn(),
    reload: jest.fn(),
    remove: jest.fn(),
    softRemove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { 
          provide: getRepositoryToken(TaskEntity),
          useClass: MockRepository,
        }
      ],
    }).compile();

    provider = module.get<TaskService>(TaskService);
    repository = module.get<MockRepository<TaskEntity>>(getRepositoryToken(TaskEntity))
  });

  it('Should initialize (Be defined)', () => {
    expect(provider).toBeDefined();
  });

  describe('List many', () => {
    it ('should return many items if user has admin permissions', () => {
      const tasks = provider.listMany(mockedCrudRequest, mockedAdminUser);
      expect(tasks).toBeDefined();
    });

    it ('should throw an ForbiddenException if the user does not have admin permissions', async () => {
      try {
        await provider.listMany(mockedCrudRequest, mockedUser)
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
      }
    })
  });

  describe('Create', () => {
    let taskPayload: CreateTaskPayload;

    beforeEach(() => {
      taskPayload = {
        content: 'content',
        groupId: 1,
        isDone: false,
      };
    });

    it ('Should throw a BadRequest when the groupId is not passed', async () => {
      try {
        taskPayload.groupId = undefined;
        await provider.create(taskPayload);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    
    it ('Should throw a BadRequest when the content is not passed', async () => {
      try {
        taskPayload.content = undefined;
        await provider.create(taskPayload);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it ('Should create and return a task entity that is not done', async () => {
        repository.save.mockImplementation(() => Promise.resolve(mockTaskEntity));

        const task = await provider.create(taskPayload);
        expect(task).toBeDefined();
        expect(task.isDone).toBeFalsy();
    });
  });

  describe('Update', () => {
    let taskPayload: UpdateTaskPayload;

    beforeEach(() => {
      taskPayload = {
        content: 'New content',
        isDone: true,
      };
    });

    it('Should throw a NotFoundException if Task ID does not exists', async () => {
      jest.spyOn(TaskEntity, 'findById').mockImplementation(() => {
        throw new NotFoundException();
      });

      try {
        await provider.update(1, taskPayload);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('Should return the updated TaskEntity', async () => {
      jest.spyOn(TaskEntity, 'findById').mockImplementation(() => Promise.resolve(mockTaskEntity))
      repository.save.mockImplementation(() => Promise.resolve({
        ...mockTaskEntity,
        content: taskPayload.content,
        isDone: taskPayload.isDone,
      }));

      const updatedTask = await provider.update(1, taskPayload);
      expect(updatedTask).toMatchObject(taskPayload);
    })
  });
});
