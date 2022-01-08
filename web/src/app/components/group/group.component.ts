import { Component, Input, OnInit } from '@angular/core';
import { GroupProxy } from '../../models/proxies/group.proxy';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  @Input()
  public group!: GroupProxy;

  public deleteGroup(groupId: number): void {

  }
}
