import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TaskService } from './services/task.service';
import { Task } from './models/task';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private taskService: TaskService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiOkResponse({ type: Task })
  public async getAll(): Promise<Task[]> {
    return  this.taskService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Task })
  public async getById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getById(+id);
  }

  @Post()
  @ApiOkResponse({ type: Task })
  public async create(@Body() task: Task): Promise<Task> {
    return this.taskService.create(task);
  }

  @Put(':id')
  @ApiOkResponse({ type: Task })
  public async update(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    task.id = +id;

    return this.taskService.update(task);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<void> {
    return this.taskService.delete(+id);
  }
}
