import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { GroupInteractor } from '../../interactors/group/group.interactor';
import { CreateGroupPayload } from '../../models/payload/create-group.payload';
import { GroupProxy } from '../../models/proxies/group.proxy';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(
    private readonly interactor: GroupInteractor,
  ) {}

  public async getAll(): Promise<GroupProxy[]> {
    return await this.interactor.getAll()
      .pipe(catchError(error => {
        throw new Error(error.error?.message || error.message);
      }))
      .toPromise();
  }

  public async getById(id: number): Promise<GroupProxy> {
    return await this.interactor.getById(id)
      .pipe(catchError(error => {
        throw new Error(error.error?.message || error.message);
      }))
      .toPromise();
  }

  public async create(payload: CreateGroupPayload): Promise<void> {
    return await this.interactor.create(payload)
      .pipe(catchError(error => {
        throw new Error(error.error?.message || error.message);
      }))
      .toPromise();
  }
}
