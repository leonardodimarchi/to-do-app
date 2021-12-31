import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
]

@NgModule({
  declarations: [],
  imports: [
    MatSnackBarModule,
    RouterModule.forChild(routes),
    CommonModule,
  ]
})
export class RegisterModule { }
