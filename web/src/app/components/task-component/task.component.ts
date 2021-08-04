import { Component, Input, OnInit } from '@angular/core';
import { TaskProxy } from '../../models/proxies/task.proxy';

@Component({
  selector: 'task-component',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor() { }

  //#region Public Properties

  @Input()
  public task!: TaskProxy;

  //#endregion

  ngOnInit(): void {
  }

}
