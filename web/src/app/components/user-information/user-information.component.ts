import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserProxy } from '../../models/proxies/user.proxy';
import { UserService } from '../../services/user/user.service';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
})
export class UserInformationComponent {

  constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
  ) {}

  @Input()
  public user!: UserProxy;

  public logout(): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Your tasks will miss you =(',
        buttonText: 'Logout',
      },
    });

    const subscription = dialogRef.afterClosed().subscribe(async (isConfirmed: boolean) => {
      if (!isConfirmed)
        return;

      await this.userService.logout();
      subscription.unsubscribe();
    });
  }
}
