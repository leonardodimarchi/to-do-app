import { Injectable } from "@nestjs/common";
import { Task } from "../models/task";

@Injectable()
export class TaskService {
  tasks: Task[] = [
    { id: 1, description: "Task 1", completed: false },
    { id: 2, description: "Task 2", completed: false },
    { id: 3, description: "Task 3", completed: true },
    { id: 4, description: "Task 4", completed: false }
  ];

  getAll(): Task[] {
    return this.tasks;
  }

  getById(id: number): Task {
    const selectedTask = this.tasks.find((task) => task.id === id);

    return selectedTask;
  }

  create(task: Task) {

  }

  update(task: Task) {

  }

  delete(id: number) {

  }
}
