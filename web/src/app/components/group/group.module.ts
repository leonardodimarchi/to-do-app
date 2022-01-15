import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { GroupComponent } from './group.component';



@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    GroupComponent,
  ],
  exports: [
    GroupComponent,
  ]
})
export class GroupModule { }
