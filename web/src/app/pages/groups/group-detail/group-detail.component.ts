import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogCreateTaskComponent } from '../../../components/dialog-create-task/dialog-create-task.component';
import { CreateTaskPayload } from '../../../models/payload/create-task.payload';
import { GroupProxy } from '../../../models/proxies/group.proxy';
import { TaskProxy } from '../../../models/proxies/task.proxy';
import { GroupService } from '../../../services/group/group.service';
import { TaskService } from '../../../services/task/task.service';

@Component({
  selector: 'app-task-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss'],
})
export class GroupDetailComponent implements OnDestroy {
  constructor(
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly activeRoute: ActivatedRoute,
    private readonly groupService: GroupService,
    private readonly tasksService: TaskService,
  ) {
    this.routeSubscription = this.activeRoute.params.subscribe(async param => {
      if (param.id) {
        await this.loadGroup(+param.id);
        await this.loadTasks();
      }
    });
  }

  public tasks: TaskProxy[] = [];

  public group: GroupProxy;

  public isLoadingTasks: boolean = false;

  public isCreatingTask: boolean = false;

  public routeSubscription: Subscription;

  public ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  public async toggleTaskDone(task: TaskProxy): Promise<void> {
    try {
      await this.tasksService.update(task.id, { isDone: !task.isDone });
      task.isDone = !task.isDone;
    } catch (error) {
      await this.snackBar.open(error.message);
    }
  }

  public deleteTask(taskId: number): void {

  }

  public async loadGroup(groupId: number): Promise<void> {
    try {
      this.isLoadingTasks = true;

      this.group = await this.groupService.getById(groupId);
    } catch (error) {
      await this.snackBar.open(error.message);
    } finally {
      this.isLoadingTasks = false;
    }
  }

  public async loadTasks(): Promise<void> {
    try {
      this.isLoadingTasks = true;

      this.tasks = await this.tasksService.getByGroupId(this.group.id);
    } catch (error) {
      await this.snackBar.open(error.message);
    } finally {
      this.isLoadingTasks = false;
    }
  }

  public openCreateTaskDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateTaskComponent);

    const subscription = dialogRef.afterClosed().subscribe(async (payload: CreateTaskPayload) => {
      if (!payload)
        return;

      if (!payload.content)
        return this.snackBar.open('Please, provide a content to create the task');

      try {
        this.isCreatingTask = true;

        await this.tasksService.create({ ...payload, groupId: this.group.id });
        await this.loadTasks();
      } catch (error) {
        await this.snackBar.open(error.message);
      } finally {
        this.isCreatingTask = false;
        subscription.unsubscribe();
      }
    });
  }

  public trackTaskById(index: number, item: TaskProxy): number {
    return item.id;
  }
}
