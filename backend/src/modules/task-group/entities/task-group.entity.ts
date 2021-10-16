import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../common/base-entity';
import { TaskEntity } from '../../tasks/entities/task.entity';
import { UserEntity } from '../../users/entities/user.entity';
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

  @OneToMany(() => TaskEntity, entity => entity.groupId)
  tasks?: TaskEntity[];

  //#region Public Methods

  public toProxy(): TaskGroupProxy {
    return new TaskGroupProxy(this);
  }

  //#endregion
}
