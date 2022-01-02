import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { GroupInteractor } from '../../interactors/group/group.interactor';
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
}
