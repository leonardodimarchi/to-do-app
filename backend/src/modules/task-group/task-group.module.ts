import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskGroupController } from './controllers/task-group.controller';
import { TaskGroupEntity } from './entities/task-group.entity';
import { TaskGroupService } from './services/task-group.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskGroupEntity
    ])
  ],
  exports: [
    TaskGroupService,
  ],
  providers: [
    TaskGroupService,
  ],
  controllers: [
    TaskGroupController,
  ],

})
export class TaskGroupModule {}
