import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { TaskInteractor } from '../../interactors/task/task.interactor';
import { CreateTaskPayload } from '../../models/payload/create-task.payload';
import { UpdateTaskPayload } from '../../models/payload/update-task.payload';
import { TaskProxy } from '../../models/proxies/task.proxy';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private readonly interactor: TaskInteractor,
  ) {}

  public async create(payload: CreateTaskPayload): Promise<void> {
    return await this.interactor.create(payload)
      .pipe(catchError(error => {
        throw new Error(error.error?.message || error.message);
      }))
      .toPromise();
  }

  public async update(id: number, payload: UpdateTaskPayload): Promise<void> {
    return await this.interactor.update(id, payload)
      .pipe(catchError(error => {
        throw new Error(error.error?.message || error.message);
      }))
      .toPromise();
  }

  public async getByGroupId(groupId: number): Promise<TaskProxy[]> {
    return await this.interactor.getByGroupId(groupId)
      .pipe(catchError(error => {
        throw new Error(error.error?.message || error.message);
      }))
      .toPromise();
  }
}
