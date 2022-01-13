import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { DialogConfirmationModule } from '../dialog-confirmation/dialog-confirmation.module';
import { UserInformationComponent } from './user-information.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    DialogConfirmationModule,
  ],
  declarations: [
    UserInformationComponent,
  ],
  exports: [
    UserInformationComponent,
  ],
})
export class UserInformationModule {}
