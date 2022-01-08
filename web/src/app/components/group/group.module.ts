import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { GroupComponent } from './group.component';



@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
  ],
  declarations: [
    GroupComponent,
  ],
  exports: [
    GroupComponent,
  ]
})
export class GroupModule { }
