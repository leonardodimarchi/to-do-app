import { TaskProxy } from './task.proxy';
import { UserProxy } from './user.proxy';

export interface GroupProxy {
  id: number;
  creatorId: number;
  title: string;
  description?: string;
  creator?: UserProxy;
  tasks?: TaskProxy[];
}
