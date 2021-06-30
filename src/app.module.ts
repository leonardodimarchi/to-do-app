import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot()
  ],
})
export class AppModule {}
