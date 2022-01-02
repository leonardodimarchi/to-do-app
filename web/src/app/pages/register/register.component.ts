import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly snackBarService: MatSnackBar,
  ) { }

  public registerFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    nickname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public hidePassword: boolean = true;
  public isLoading: boolean = false;

  public async register(): Promise<void> {
    if (!this.registerFormGroup.valid)
      return;

    try {
      this.isLoading = true;

      await this.userService.registerAndLogin(this.registerFormGroup.getRawValue());
      await this.router.navigateByUrl('/group');
    } catch (error) {
      this.snackBarService.open(error.message, 'Dismiss', { duration: 2000 });
    } finally {
      this.isLoading = false;
    }
  }
}
