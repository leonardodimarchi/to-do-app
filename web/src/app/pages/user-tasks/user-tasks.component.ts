import { Component, OnInit } from '@angular/core';
import { TaskProxy } from '../../models/proxies/task.proxy';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  task: TaskProxy = {
    title: 'Task title',
    completed: false,
    createdAt: new Date(),
    description: 'Task description'
  }

}
