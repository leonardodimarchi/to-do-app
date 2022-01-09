import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskProxy } from '../../models/proxies/task.proxy';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {

  constructor(
    private readonly tasksService: TaskService,
    private readonly snackBar: MatSnackBar,
  ) {}

  @Input()
  public task!: TaskProxy;

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
}
