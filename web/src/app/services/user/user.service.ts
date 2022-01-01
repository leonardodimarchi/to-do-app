import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserInteractor } from '../../interactors/user/user.interactor';
import { CreateUserPayload } from '../../models/payload/create-user.payload';
import { LoginPayload } from '../../models/payload/login.payload';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private readonly interactor: UserInteractor,
    private readonly router: Router,
  ) {}

  public async registerAndLogin(payload: CreateUserPayload): Promise<void> {
    await this.interactor.register(payload)
      .pipe(catchError(error => {
        throw new Error(error.error?.message || error.message);
      }))
      .toPromise();

    try {
      await this.login({ nickname: payload.nickname, password: payload.password });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async login(payload: LoginPayload): Promise<void> {
    const token = await this.interactor.login(payload)
      .pipe(catchError(error => {
        throw new Error(error.error?.message || error.message);
      }))
      .toPromise();

    localStorage.setItem(environment.keys.userToken, JSON.stringify(token));
  }

  public async logout(): Promise<void> {
    localStorage.clear();
    await this.router.navigateByUrl('/login');
  }
}
