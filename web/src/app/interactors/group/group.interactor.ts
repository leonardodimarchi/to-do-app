import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GroupProxy } from '../../models/proxies/group.proxy';

@Injectable({
  providedIn: 'root',
})
export class GroupInteractor {
  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public getAll(): Observable<GroupProxy[]> {
    return this.httpClient.get<GroupProxy[]>(environment.apiEndpoints.groups.getAll);
  }
}
