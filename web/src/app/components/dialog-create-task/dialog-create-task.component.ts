import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateTaskPayload } from '../../models/payload/create-task.payload';

@Component({
  selector: 'app-dialog-create-task',
  templateUrl: './dialog-create-task.component.html',
  styleUrls: ['./dialog-create-task.component.scss'],
})
export class DialogCreateTaskComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogCreateTaskComponent>,
  ) {}

  public payload: CreateTaskPayload = {
    groupId: 0,
    content: '',
  };

  public close(): void {
    this.dialogRef.close(this.payload);
  }
}
