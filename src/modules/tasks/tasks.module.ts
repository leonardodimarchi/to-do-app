import { Module } from '@nestjs/common';
import { TaskService } from "./services/task.service";
import { TasksController } from "./tasks.controller";

@Module({
  exports: [
    TaskService,
  ],
  providers: [
    TaskService,
  ],
  controllers: [
    TasksController,
  ],

})
export class TasksModule {}
