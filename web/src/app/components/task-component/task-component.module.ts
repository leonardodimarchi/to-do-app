import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TaskComponent,
  ],
  exports: [
    TaskComponent,
  ],
})
export class TaskComponentModule { }
