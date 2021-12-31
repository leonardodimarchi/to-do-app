import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskGroupsComponent } from './task-groups.component';

const routes: Routes = [
  { path: '', component: TaskGroupsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  declarations: [
    TaskGroupsComponent,
  ],
  exports: [
    TaskGroupsComponent,
  ],
})
export class TaskGroupsModule {}
