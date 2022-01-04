import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateGroupPayload } from '../../models/payload/create-group.payload';

@Component({
  selector: 'app-dialog-create-group',
  templateUrl: './dialog-create-group.component.html',
  styleUrls: ['./dialog-create-group.component.scss'],
})
export class DialogCreateGroupComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogCreateGroupComponent>,
  ) {}

  public payload: CreateGroupPayload = {
    title: '',
    description: '',
  };

  public close(): void {
    this.dialogRef.close(this.payload);
  }
}
