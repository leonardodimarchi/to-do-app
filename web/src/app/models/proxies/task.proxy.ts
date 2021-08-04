export interface TaskProxy {
  id?: number;
  createdAt: Date;
  updatedAt?: string;

  title: string;
  description?: string;
  completed: boolean;
}
