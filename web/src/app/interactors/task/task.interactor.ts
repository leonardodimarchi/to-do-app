import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UpdateTaskPayload } from '../../models/payload/update-task.payload';

@Injectable({
  providedIn: 'root',
})
export class TaskInteractor {
  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  public update(id: number, payload: UpdateTaskPayload): Observable<void> {
    const url = environment.apiBaseUrl + environment.apiEndpoints.tasks.base + '/' + id;
    return this.httpClient.put<void>(url, payload);
  }
}
