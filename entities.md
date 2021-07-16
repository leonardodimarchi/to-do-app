```typescript
classDiagram

class User {
    id: number;
    nickname: string; // 64
    firstName: string; // 128
    surName: string; // 128

    userGroups: UserGroup[]; // Many to many
    Tasks: Task[]; // One to many
}

class Task {
    id: number;
    title: string; // 64
    description: string; // 64
    completed: boolean;
}

class UserGroup {
    id: number;
    users: User[]; // One to many
    tasks: Task[]; // One to many
}
```