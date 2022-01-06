import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateGroupPayload } from '../../models/payload/create-group.payload';
import { GroupProxy } from '../../models/proxies/group.proxy';

@Injectable({
  providedIn: 'root',
})
export class GroupInteractor {
  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public getAll(): Observable<GroupProxy[]> {
    return this.httpClient.get<GroupProxy[]>(environment.apiBaseUrl + environment.apiEndpoints.groups.base + '?sort=createdAt,DESC');
  }

  public getById(id: number): Observable<GroupProxy> {
    const url = environment.apiBaseUrl + environment.apiEndpoints.groups.base + '/' + id;

    return this.httpClient.get<GroupProxy>(url + '?join=tasks');
  }

  public create(payload: CreateGroupPayload): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseUrl + environment.apiEndpoints.groups.base, payload);
  }
}
