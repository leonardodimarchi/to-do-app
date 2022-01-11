import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateTaskPayload } from '../../models/payload/create-task.payload';
import { UpdateTaskPayload } from '../../models/payload/update-task.payload';
import { TaskProxy } from '../../models/proxies/task.proxy';

@Injectable({
  providedIn: 'root',
})
export class TaskInteractor {
  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  public create(payload: CreateTaskPayload): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseUrl + environment.apiEndpoints.tasks.base, payload);
  }

  public update(id: number, payload: UpdateTaskPayload): Observable<void> {
    const url = environment.apiBaseUrl + environment.apiEndpoints.tasks.base + '/' + id;
    return this.httpClient.put<void>(url, payload);
  }

  public delete(id: number): Observable<void> {
    const url = environment.apiBaseUrl + environment.apiEndpoints.tasks.base + '/' + id;
    return this.httpClient.delete<void>(url);
  }

  public getByGroupId(groupId: number): Observable<TaskProxy[]> {
    const searchParams = encodeURIComponent(JSON.stringify({
      isActive: true,
      groupId
    }));

    const url = environment.apiBaseUrl + environment.apiEndpoints.tasks.base + '?s=' + searchParams;
    return this.httpClient.get<TaskProxy[]>(url + '&sort=createdAt,DESC');
  }
}
