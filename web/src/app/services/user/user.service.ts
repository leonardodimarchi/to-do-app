import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserInteractor } from '../../interactors/user/user.interactor';
import { CreateUserPayload } from '../../models/payload/create-user.payload';
import { LoginPayload } from '../../models/payload/login.payload';
import { UserProxy } from '../../models/proxies/user.proxy';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly interactor: UserInteractor,
    private readonly router: Router,
  ) {}

  private currentUser: BehaviorSubject<UserProxy> = new BehaviorSubject<UserProxy>(null);

  public getCurrentUser$(): Observable<UserProxy> {
    return this.currentUser.asObservable();
  }

  public async logout(): Promise<void> {
    localStorage.clear();
    this.currentUser.next(null);
    await this.router.navigateByUrl('/login');
  }

  public hasTokenOnStorage(): boolean {
    return !!localStorage.getItem(environment.keys.userToken);
  }

  public async loadCurrentUserInformation(): Promise<void> {
    const userInformation = await this.interactor.loadCurrentUserInformation()
      .pipe(catchError(error => {
        throw new Error(error.error?.message || error.message);
      }))
      .toPromise();

    this.currentUser.next(userInformation);
  }

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

    await this.loadCurrentUserInformation();
  }
}
