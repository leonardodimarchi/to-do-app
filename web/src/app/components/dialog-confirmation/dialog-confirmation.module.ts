import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DialogConfirmationComponent } from './dialog-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [
    DialogConfirmationComponent
  ],
  exports: [
    DialogConfirmationComponent
  ]
})
export class DialogConfirmationModule { }
