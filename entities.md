```typescript
class Task {
  id: number;
  title: string; // 64
  description: string; // 64
  completed: boolean;
}

class UserTask {
  userId: number;
  taskId: number;

  user: User; // One to many
  task: Task; // One to one
}

class GroupTask {
  groupId: number;
  taskId: number;

  task: Task;
  group: Group;
}

class User {
    id: number;
    nickname: string; // 64
    firstName: string; // 128
    surName: string; // 128

    userGroups: UserGroup[]; // Many to many
    Tasks: UserTask[]; // One to many
}

class UserGroup {
  userId: number;
  groupId: number;

  group: Group; // One to one
  user: User; // One to one
}

class Group {
  id: number;
  accessCode: string; //64
  maxUsers: number;
  
  users: UserGroup[]; // One to many
  tasks: GroupTask[]; // One to many
}
```
