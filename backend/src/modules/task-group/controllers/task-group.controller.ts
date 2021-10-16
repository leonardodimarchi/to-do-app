//#region Imports

import { Body, ClassSerializerInterceptor, Controller, Param, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudRequest, GetManyDefaultResponse, Override, ParsedRequest } from '@nestjsx/crud';
import { BaseEntityCrudController } from '../../../common/base-entity-crud.controller';
import { UsersPermissions } from '../../../models/enums/users-permissions';
import { hasPermissions } from '../../auth/decorators/has-permissions.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../auth/guards/permissions.guard';
import { TaskProxy } from '../../tasks/models/task.proxy';
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
      'deleteOneBase',
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

  @hasPermissions(UsersPermissions.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Get all task-groups' })
  @ApiOkResponse({ type: GetManyDefaultResponseTaskGroupProxy })
  public async getMany(@ParsedRequest() crudRequest: CrudRequest): Promise<GetManyDefaultResponseTaskGroupProxy | TaskGroupProxy[]> {
    return await this.service.listMany(crudRequest).then(response => {
      const taskGroups = Array.isArray(response) ? response : response.data;
      return taskGroups.map(taskGroup => taskGroup.toProxy());
    });
  }

  @hasPermissions(UsersPermissions.ADMIN, UsersPermissions.USER)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Get a task-group by id' })
  @ApiOkResponse({ type: TaskGroupProxy })
  public async getOne(@Param('id') id: number, @ParsedRequest() crudRequest: CrudRequest): Promise<TaskGroupProxy> {
    return await this.service.get(+id).then(response => response.toProxy());
  }

  @hasPermissions(UsersPermissions.ADMIN, UsersPermissions.USER)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Create a task-group' })
  @ApiOkResponse({ type: TaskGroupProxy })
  public async createOne(@Request() req: any, @Body() payload: CreateTaskGroupPayload): Promise<TaskGroupProxy> {
    return await this.service.create(req.user, payload).then(response => response.toProxy());
  }

  @hasPermissions(UsersPermissions.USER, UsersPermissions.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Update a task-group' })
  @ApiOkResponse({ type: TaskProxy })
  public async replaceOne(@Request() req: any, @Param('id') id: string, @Body() payload: CreateTaskGroupPayload): Promise<TaskGroupProxy> {
    return await this.service.update(req.user, +id, payload).then(response => response.toProxy());
  }
}
