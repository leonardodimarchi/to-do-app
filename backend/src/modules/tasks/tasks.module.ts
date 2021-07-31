import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { TaskService } from "./services/task.service";
import { TaskController } from "./controllers/task.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskEntity
    ])
  ],
  exports: [
    TaskService,
  ],
  providers: [
    TaskService,
  ],
  controllers: [
    TaskController,
  ],

})
export class TasksModule {}
