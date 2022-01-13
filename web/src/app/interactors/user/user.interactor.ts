import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateUserPayload } from '../../models/payload/create-user.payload';
import { LoginPayload } from '../../models/payload/login.payload';
import { UserProxy } from '../../models/proxies/user.proxy';

@Injectable({
  providedIn: 'root',
})
export class UserInteractor {
  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  public loadCurrentUserInformation(): Observable<UserProxy> {
    return this.httpClient.get<UserProxy>(environment.apiBaseUrl + environment.apiEndpoints.user.getMe);
  }

  public register(payload: CreateUserPayload): Observable<CreateUserPayload> {
    return this.httpClient.post<CreateUserPayload>(environment.apiBaseUrl + environment.apiEndpoints.user.base, payload);
  }

  public login(payload: LoginPayload): Observable<any> {
    return this.httpClient.post<any>(environment.apiBaseUrl + environment.apiEndpoints.auth.local, payload);
  }
}
