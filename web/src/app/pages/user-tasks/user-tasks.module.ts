import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponentModule } from '../../components/task-component/task-component.module';
import { UserTasksComponent } from './user-tasks.component';

const routes: Routes = [
  { path: '', component: UserTasksComponent}
]

@NgModule({
  imports: [
    CommonModule,
    TaskComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserTasksComponent,
  ],
  exports: [
    UserTasksComponent,
  ],
})
export class UserTasksModule { }
