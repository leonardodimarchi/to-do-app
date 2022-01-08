import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BackgroundAnimationService } from '../../services/background-animation/background-animation.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly snackBarService: MatSnackBar,
    private readonly backgroundAnimationService: BackgroundAnimationService,
  ) { }

  @ViewChild('page')
  private page: ElementRef<HTMLDivElement> | null;

  public loginFormGroup: FormGroup = new FormGroup({
    nickname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public hidePassword: boolean = true;

  public isLoading: boolean = false;

  public ngAfterViewInit(): void {
    this.backgroundAnimationService.addWaveEffect(this.page.nativeElement, {
      mouseControls: true,
      touchControls: true,
      color: 0x90909,
      shininess: 2.00,
      waveHeight: 11.00,
      waveSpeed: 0.70,
      zoom: 0.65
    });
  }

  public async login(): Promise<void> {
    if (!this.loginFormGroup.valid)
      return;

    try {
      this.isLoading = true;

      await this.userService.login(this.loginFormGroup.getRawValue());
      await this.router.navigateByUrl('/groups');
    } catch (error) {
      this.snackBarService.open(error.message, 'Dismiss', { duration: 2000 });
    } finally {
      this.isLoading = false;
    }
  }
}
