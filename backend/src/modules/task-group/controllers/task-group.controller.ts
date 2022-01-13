//#region Imports

import { Body, ClassSerializerInterceptor, Controller, Delete, Param, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { BaseEntityCrudController } from '../../../common/base-entity-crud.controller';
import { User } from '../../../decorators/user.decorator';
import { UsersPermissions } from '../../../models/enums/users-permissions';
import { hasPermissions } from '../../auth/decorators/has-permissions.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../auth/guards/permissions.guard';
import { TaskProxy } from '../../tasks/models/task.proxy';
import { UserEntity } from '../../users/entities/user.entity';
import { TaskGroupEntity } from '../entities/task-group.entity';
import { CreateTaskGroupPayload } from '../models/create-task-group.payload';
import { GetManyDefaultResponseTaskGroupProxy, TaskGroupProxy } from '../models/task-group.proxy';
import { TaskGroupService } from '../services/task-group.service';

//#endregion

@ApiBearerAuth()
@Crud({
  model: {
    type: TaskGroupEntity,
  },
  query: {
    join: {
      creator: {
        exclude: ['password', 'permissions'],
      },
      tasks: {},
    },
  },
  routes: {
    exclude: [
      'updateOneBase',
      'createManyBase',
      'deleteOneBase'
    ],
  },
})
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('task-group')
@Controller('task-group')
export class TaskGroupController extends BaseEntityCrudController<TaskGroupEntity, TaskGroupService> {
  constructor(
    public service: TaskGroupService,
  ) {
    super(service);
  }

  @hasPermissions(UsersPermissions.ADMIN, UsersPermissions.USER)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Get all task-group' })
  @ApiOkResponse({ type: GetManyDefaultResponseTaskGroupProxy })
  public async getMany(@User() user: UserEntity, @ParsedRequest() crudRequest: CrudRequest): Promise<GetManyDefaultResponseTaskGroupProxy | TaskGroupProxy[]> {
    const result = await this.service.listMany(crudRequest, user);

    const taskGroups = Array.isArray(result) ? result : result.data;
    const proxyGroups = taskGroups.map(async taskGroup => {
      const taskNumbers = await taskGroup.getNumberOfTasks();

      return taskGroup.toProxy(taskNumbers);
    });

    return await Promise.all(proxyGroups);
  }

  @hasPermissions(UsersPermissions.ADMIN, UsersPermissions.USER)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Get a task-group by id' })
  @ApiOkResponse({ type: TaskGroupProxy })
  public async getOne(@Param('id') id: number, @ParsedRequest() crudRequest: CrudRequest): Promise<TaskGroupProxy> {
    return await this.service.get(+id, crudRequest).then(response => response.toProxy());
  }

  @hasPermissions(UsersPermissions.ADMIN, UsersPermissions.USER)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Create a task-group' })
  @ApiOkResponse({ type: TaskGroupProxy })
  public async createOne(@User() user: UserEntity, @Body() payload: CreateTaskGroupPayload): Promise<TaskGroupProxy> {
    return await this.service.create(user, payload).then(response => response.toProxy());
  }

  @hasPermissions(UsersPermissions.USER, UsersPermissions.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Update a task-group' })
  @ApiOkResponse({ type: TaskProxy })
  public async replaceOne(@User() user: UserEntity, @Param('id') id: string, @Body() payload: CreateTaskGroupPayload): Promise<TaskGroupProxy> {
    return await this.service.update(user, +id, payload).then(response => response.toProxy());
  }

  @hasPermissions(UsersPermissions.USER, UsersPermissions.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  public async deleteOne(@Param('id') id: string,  @User() user: UserEntity): Promise<TaskGroupProxy> {
    return await this.service.delete(+id, user).then(response => response.toProxy());
  }
}
