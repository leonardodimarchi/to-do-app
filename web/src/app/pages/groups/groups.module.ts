import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { DialogCreateGroupModule } from '../../components/dialog-create-group/dialog-create-group.module';
import { GroupModule } from '../../components/group/group.module';
import { GroupsComponent } from './groups.component';

const routes: Routes = [
  { path: '', component: GroupsComponent },
  { path: ':id', loadChildren: () => import ('./group-detail/group-detail.module').then(m => m.GroupDetailModule) },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    DialogCreateGroupModule,
    GroupModule,
  ],
  declarations: [
    GroupsComponent,
  ],
  exports: [
    GroupsComponent,
  ],
})
export class GroupsModule {}
