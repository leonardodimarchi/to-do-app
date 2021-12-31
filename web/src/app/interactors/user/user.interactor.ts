import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateUserPayload } from '../../models/payload/create-user.payload';
import { LoginPayload } from '../../models/payload/login.payload';

@Injectable({
  providedIn: 'root',
})
export class UserInteractor {
  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  public register(payload: CreateUserPayload): Observable<CreateUserPayload> {
    return this.httpClient.post<CreateUserPayload>(environment.apiBaseUrl + environment.apiEndpoints.user, payload);
  }

  public login(payload: LoginPayload): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseUrl + environment.apiEndpoints.auth.local, payload);
  }
}
