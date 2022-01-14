import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskProxy } from '../../models/proxies/task.proxy';
import { TaskService } from '../../services/task/task.service';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {

  constructor(
    private readonly tasksService: TaskService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) {}

  @Input()
  public task!: TaskProxy;

  @Output()
  public deletedTaskOutput: EventEmitter<void> = new EventEmitter<void>();

  public isDeletingTask: boolean = false;

  public isUpdatingTask: boolean = false;

  public async toggleTaskDone(): Promise<void> {
    if (this.isUpdatingTask)
      return;

    try {
      this.isUpdatingTask = true;

      this.task.isDone = !this.task.isDone;

      await this.tasksService.update(this.task.id, { isDone: this.task.isDone });
    } catch (error) {
      this.task.isDone = !this.task.isDone;
      await this.snackBar.open(error.message);
    } finally {
      this.isUpdatingTask = false;
    }
  }

  public deleteTask(): void {
    if (this.isDeletingTask)
      return;

    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Delete the task?',
        buttonText: 'Confirm',
      },
    });

    const subscription = dialogRef.afterClosed().subscribe(async (isConfirmed) => {
      if (!isConfirmed)
        return;

      try {
        this.isDeletingTask = true;

        await this.tasksService.delete(this.task.id);
        this.deletedTaskOutput.emit();
      } catch (error) {
        await this.snackBar.open(error.message, '', { duration: 3000 });
      } finally {
        this.isDeletingTask = false;
        subscription.unsubscribe();
      }
    });
  }
}
