//#region Imports

import { BaseEntity } from '../../../common/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { TaskGroupEntity } from '../../task-group/entities/task-group.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { TaskProxy } from '../models/task.proxy';

//#endregion

/**
 * A entidade das tarefas
 */
@Entity('tasks')
export class TaskEntity extends BaseEntity {
  constructor(partial: Partial<TaskEntity>) {
    super();

    Object.assign(this, partial);
  }

  @Column({ nullable: false })
  groupId: number;

  @Column({ nullable: false, length: 256 })
  content: string;

  @Column({ nullable: false, default: false })
  isDone: boolean;

  @ManyToOne(() => TaskGroupEntity, group => group.tasks)
  group?: TaskGroupEntity;

  //#region Public Methods

  /**
   * Método que retorna um proxy da entidade
   */
  public toProxy(): TaskProxy {
    return new TaskProxy(this);
  }

  //#endregion
}
