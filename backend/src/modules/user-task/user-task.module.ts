import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTaskController } from './controllers/user-task.controller';
import { UserTaskEntity } from './entities/user-task.entity';
import { UserTaskService } from './services/user-task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserTaskEntity
    ])
  ],
  exports: [
    UserTaskService,
  ],
  providers: [
    UserTaskService,
  ],
  controllers: [
    UserTaskController,
  ],

})
export class UserTaskModule {}
