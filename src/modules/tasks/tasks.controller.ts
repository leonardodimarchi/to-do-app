import { Controller, Get, Param } from "@nestjs/common";
import { TaskService } from "./services/task.service";
import { Task } from "./models/task";

@Controller('tasks')
export class TasksController {
  constructor(
    private taskService: TaskService,
  ) {}

  @Get()
  public async getAll(): Promise<Task[]> {
    return this.taskService.getAll();
  }

  @Get('/:id')
  public async getById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getById(id);
  }
}
