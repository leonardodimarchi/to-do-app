import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserProxy } from './models/proxies/user.proxy';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private readonly userService: UserService,
  ) {
    this.currentUserSubscription = this.userService.getCurrentUser$().subscribe(user => {
      if (user)
        this.currentUser = user;
    });
  }

  private currentUserSubscription: Subscription;

  public currentUser: UserProxy;

  public async ngOnInit(): Promise<void> {
    await this.userService.loadCurrentUserInformation();
  }

  public ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }
}
