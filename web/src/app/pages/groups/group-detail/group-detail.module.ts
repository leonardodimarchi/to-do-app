import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { DialogCreateTaskModule } from '../../../components/dialog-create-task/dialog-create-task.module';
import { TaskModule } from '../../../components/task/task.module';
import { GroupDetailComponent } from './group-detail.component';

const routes: Routes = [
  { path: '', component: GroupDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    DialogCreateTaskModule,
    TaskModule,
  ],
  declarations: [
    GroupDetailComponent,
  ],
  exports: [
    GroupDetailComponent,
  ],
})
export class GroupDetailModule {}
