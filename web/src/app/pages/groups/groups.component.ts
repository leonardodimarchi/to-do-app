import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogCreateGroupComponent } from '../../components/dialog-create-group/dialog-create-group.component';
import { CreateGroupPayload } from '../../models/payload/create-group.payload';
import { GroupProxy } from '../../models/proxies/group.proxy';
import { GroupService } from '../../services/group/group.service';

@Component({
  selector: 'app-task-group',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  constructor(
    private readonly groupService: GroupService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
  ) {}

  public taskGroups: GroupProxy[] = [];

  public isLoadingGroups: boolean = false;

  public isCreatingGroup: boolean = false;

  public async ngOnInit(): Promise<void> {
    await this.loadGroups();
  }

  public async loadGroups(): Promise<void> {
    try {
      this.isLoadingGroups = true;

      this.taskGroups = await this.groupService.getAll();
    } catch (error) {
      await this.snackBar.open(error.message);
    } finally {
      this.isLoadingGroups = false;
    }
  }

  public openCreateGroupDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateGroupComponent);

    const subscription = dialogRef.afterClosed().subscribe(async (payload: CreateGroupPayload) => {
      if (!payload)
        return;

      if (!payload.title)
        return this.snackBar.open('Please, provide a name to create a task group');

      try {
        this.isCreatingGroup = true;

        await this.groupService.create(payload);
        await this.loadGroups();
      } catch (error) {
        await this.snackBar.open(error.message);
      } finally {
        this.isCreatingGroup = false;
        subscription.unsubscribe();
      }
    });
  }

  public trackGroupById(index: number, item: GroupProxy): number {
    return item.id;
  }
}
