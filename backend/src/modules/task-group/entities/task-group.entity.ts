import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base-entity';
import { TaskEntity } from '../../tasks/entities/task.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { TaskCount } from '../models/task-count.interface';
import { TaskGroupProxy } from '../models/task-group.proxy';

@Entity('task-group')
export class TaskGroupEntity extends BaseEntity {
  constructor(partial: Partial<TaskGroupEntity>) {
    super();

    Object.assign(this, partial);
  }

  @Column({ nullable: false })
  creatorId: number;

  @Column({ nullable: false, length: 256 })
  title: string;

  @Column({ nullable: true, length: 256 })
  description?: string;

  @ManyToOne(() => UserEntity)
  creator?: UserEntity;

  @OneToMany(() => TaskEntity, entity => entity.group)
  tasks?: TaskEntity[];

  //#region Public Methods

  public toProxy(numberOfTasks?: TaskCount): TaskGroupProxy {
    return new TaskGroupProxy(this, numberOfTasks);
  }

  public async getNumberOfTasks(): Promise<{ taskCount: number, taskCountCompleted: number }> {
    const groupTaskWithTasks = await TaskGroupEntity.findById<TaskGroupEntity>(this.id, false, ['tasks']);

    const tasks = groupTaskWithTasks.tasks.filter(task => task.isActive)

    return {
      taskCount: tasks.length,
      taskCountCompleted: tasks.filter(task => task.isDone).length,
    };
  }

  //#endregion
}
