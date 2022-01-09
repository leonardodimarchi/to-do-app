import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TaskComponent } from './task.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
  ],
  declarations: [
    TaskComponent,
  ],
  exports: [
    TaskComponent,
  ]
})
export class TaskModule { }
