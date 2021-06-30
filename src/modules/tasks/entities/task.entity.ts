//#region Imports

import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base-entity';

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

  @Column({ nullable: false, length: 64 })
  title: string;

  @Column({ nullable: false, length: 256 })
  description: string;

  @Column({ nullable: false, default: false })
  completed: boolean;
}