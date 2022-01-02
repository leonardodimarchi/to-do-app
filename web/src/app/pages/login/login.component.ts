import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly snackBarService: MatSnackBar,
  ) { }

  public loginFormGroup: FormGroup = new FormGroup({
    nickname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public hidePassword: boolean = true;

  public isLoading: boolean = false;

  public async login(): Promise<void> {
    if (!this.loginFormGroup.valid)
      return;

    try {
      this.isLoading = true;

      await this.userService.login(this.loginFormGroup.getRawValue());
      await this.router.navigateByUrl('/group');
    } catch (error) {
      this.snackBarService.open(error.message, 'Dismiss', { duration: 2000 });
    } finally {
      this.isLoading = false;
    }
  }
}
