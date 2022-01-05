import { TaskProxy } from './task.proxy';
import { UserProxy } from './user.proxy';

export interface GroupProxy {
  id: number;
  creatorId: number;
  title: string;
  taskCount: number;
  taskCountCompleted: number;
  description?: string;
  creator?: UserProxy;
  tasks?: TaskProxy[];
}
