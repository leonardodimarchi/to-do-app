import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './modules/tasks/tasks.module';
import { UserTaskModule } from './modules/user-task/user-task.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(),
    UsersModule,
    UserTaskModule,
    AuthModule
  ],
})
export class AppModule {}
