import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { UserInteractor } from '../../interactors/user/user.interactor';
import { CreateUserPayload } from '../../models/payload/create-user.payload';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private readonly interactor: UserInteractor,
  ) {}

  public async register(payload: CreateUserPayload): Promise<void> {
    await this.interactor.register(payload)
      .pipe(catchError(error => {
        throw new Error(error.error?.message || error.message)
      }))
      .toPromise();
  }
}
