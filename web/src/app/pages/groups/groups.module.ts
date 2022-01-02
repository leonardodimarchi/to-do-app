import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups.component';
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  { path: '', component: GroupsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
  ],
  declarations: [
    GroupsComponent,
  ],
  exports: [
    GroupsComponent,
  ],
})
export class GroupsModule {}
