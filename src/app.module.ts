import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(),
    UsersModule
  ],
})
export class AppModule {}
