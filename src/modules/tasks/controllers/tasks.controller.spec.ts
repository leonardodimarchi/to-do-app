import { Test } from '@nestjs/testing';
import { TaskProxy } from './models/task.proxy';
import { TaskService } from './services/task.service';
import { TasksController } from './tasks.controller';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TaskService;

  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TaskService],
    }).compile()

    service = testModule.get<TaskService>(TaskService);
    controller = testModule.get<TasksController>(TasksController);
  });

  it('Should return a array of tasks', async () => {
    const taskList: TaskProxy[] = [{ id: 0, completed: false, description: '' }]
    jest.spyOn(service, 'getAll').mockImplementation(() => taskList);

    expect(await controller.getAll()).toBe(taskList)
  });
});
