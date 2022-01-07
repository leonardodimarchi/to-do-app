import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { TaskInteractor } from '../../interactors/task/task.interactor';
import { CreateGroupPayload } from '../../models/payload/create-group.payload';
import { UpdateTaskPayload } from '../../models/payload/update-task.payload';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private readonly interactor: TaskInteractor,
  ) {}

  public async update(id: number, payload: UpdateTaskPayload): Promise<void> {
    return await this.interactor.update(id, payload)
      .pipe(catchError(error => {
        throw new Error(error.error?.message || error.message);
      }))
      .toPromise();
  }
}
