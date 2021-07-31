import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../common/base-entity';
import { TaskEntity } from '../../tasks/entities/task.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { UserTaskProxy } from '../models/user-task.proxy';

@Entity('user-tasks')
export class UserTaskEntity extends BaseEntity {
  constructor(partial: Partial<UserTaskEntity>) {
    super();

    Object.assign(this, partial);
  }

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  taskId: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @OneToOne(() => TaskEntity)
  task: TaskEntity;

  //#region Public Methods

  public toProxy(): UserTaskProxy {
    return new UserTaskProxy(this);
  }

  //#endregion
}
