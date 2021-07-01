import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TaskService } from './services/task.service';
import { TaskProxy } from './models/task.proxy';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private taskService: TaskService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiOkResponse({ type: TaskProxy })
  public async getAll(): Promise<TaskProxy[]> {
    return  this.taskService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: TaskProxy })
  public async getById(@Param('id') id: string): Promise<TaskProxy> {
    return this.taskService.getById(+id);
  }

  @Post()
  @ApiOkResponse({ type: TaskProxy })
  public async create(@Body() task: TaskProxy): Promise<TaskProxy> {
    return this.taskService.create(task);
  }

  @Put(':id')
  @ApiOkResponse({ type: TaskProxy })
  public async update(@Param('id') id: string, @Body() task: TaskProxy): Promise<TaskProxy> {
    task.id = +id;

    return this.taskService.update(task);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<void> {
    return this.taskService.delete(+id);
  }
}
