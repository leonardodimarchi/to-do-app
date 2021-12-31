import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CreateUserPayload } from '../../models/payload/create-user.payload';

@Injectable({
  providedIn: 'root',
})
export class UserInteractor {
  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  public register(payload: CreateUserPayload): Observable<CreateUserPayload> {
    return this.httpClient.post<CreateUserPayload>(environment.apiBaseUrl + environment.apiEndpoints.user, payload)
  }
}
