import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { Task } from './models/task';

@Controller('tasks')
export class TasksController {
  constructor(
    private taskService: TaskService,
  ) {}

  @Get()
  public async getAll(): Promise<Task[]> {
    return  this.taskService.getAll();
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getById(+id);
  }

  @Post()
  public async create(@Body() task: Task): Promise<Task> {
    return this.taskService.create(task);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    task.id = +id;

    return this.taskService.update(task);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<void> {
    return this.taskService.delete(+id);
  }
}
