import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GroupProxy } from '../../models/proxies/group.proxy';
import { GroupService } from '../../services/group/group.service';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {

  constructor(
    private readonly groupService: GroupService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
  ) {}

  @Input()
  public group!: GroupProxy;

  @Output()
  public deletedGroupOutput: EventEmitter<void> = new EventEmitter<void>();

  public isDeletingGroup: boolean = false;

  public deleteGroup(): void {
    if (this.isDeletingGroup)
      return;

    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Delete the Group?',
        text: 'This will also delete the group tasks',
        buttonText: 'Proceed',
      },
    });

    const subscription = dialogRef.afterClosed().subscribe(async (isConfirmed) => {
      if (!isConfirmed)
        return;

      try {
        this.isDeletingGroup = true;

        await this.groupService.delete(this.group.id);
        this.deletedGroupOutput.emit();
      } catch (error) {
        await this.snackBar.open(error.message, '', { duration: 3000 });
      } finally {
        this.isDeletingGroup = false;
        subscription.unsubscribe();
      }
    });
  }
}
