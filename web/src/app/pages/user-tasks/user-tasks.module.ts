import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTasksComponent } from './user-tasks.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    UserTasksComponent,
  ],
  exports: [
    UserTasksComponent,
  ],
})
export class UserTasksModule { }
