import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { DialogCreateGroupComponent } from '../../components/dialog-create-group/dialog-create-group.component';
import { CreateGroupPayload } from '../../models/payload/create-group.payload';
import { GroupService } from '../../services/group/group.service';

@Component({
  selector: 'app-task-group',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit, OnDestroy {
  constructor(
    private readonly groupService: GroupService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
  ) {}

  public isCreatingGroup: boolean = false;

  private createGroupDialogSubscription: Subscription;

  public async ngOnInit(): Promise<void> {
    const groups = await this.groupService.getAll();
    console.log(groups)
  }

  public ngOnDestroy(): void {
    this.createGroupDialogSubscription.unsubscribe();
  }

  public openCreateGroupDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateGroupComponent);

    dialogRef.afterClosed().subscribe(async (payload: CreateGroupPayload) => {
      if (!payload)
        return;

      if (!payload.title)
        return this.snackBar.open('Please, provide a name to create a task group');

      try {
        this.isCreatingGroup = true;

        await this.groupService.create(payload);
      } catch (error) {
        await this.snackBar.open(error.message);
      } finally {
        this.isCreatingGroup = false;
      }
    });
  }
}
