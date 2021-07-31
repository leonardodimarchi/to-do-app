//#region Imports

import { Body, ClassSerializerInterceptor, Controller, Param, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudRequest, GetManyDefaultResponse, Override, ParsedRequest } from '@nestjsx/crud';
import { response } from 'express';
import { BaseEntityCrudController } from '../../../common/base-entity-crud.controller';
import { UsersPermissions } from '../../../models/enums/users-permissions';
import { hasPermissions } from '../../auth/decorators/has-permissions.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../auth/guards/permissions.guard';
import { TaskProxy } from '../../tasks/models/task.proxy';
import { UserTaskEntity } from '../entities/user-task.entity';
import { CreateUserTaskPayload } from '../models/create-user-task.payload';
import { GetManyDefaultResponseUserTaskProxy, UserTaskProxy } from '../models/user-task.proxy';
import { UserTaskService } from '../services/user-task.service';

//#endregion

@ApiBearerAuth()
@Crud({
  model: {
    type: UserTaskEntity,
  },
  query: {
    join: {
      user: {
        exclude: ['password', 'permissions']
      },
      task: {}
    }
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
@ApiTags('user-task')
@Controller('user-task')
export class UserTaskController extends BaseEntityCrudController<UserTaskEntity, UserTaskService> {
  constructor(
    public service: UserTaskService,
  ) {
    super(service);
  }

  @hasPermissions(UsersPermissions.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Get all user tasks' })
  @ApiOkResponse({ type: GetManyDefaultResponseUserTaskProxy })
  public async getMany(@ParsedRequest() crudRequest: CrudRequest): Promise<GetManyDefaultResponseUserTaskProxy | UserTaskProxy[]> {
    return await this.service.listMany(crudRequest);
  }

  @hasPermissions(UsersPermissions.ADMIN, UsersPermissions.USER)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Get a user task by id' })
  @ApiOkResponse({ type: UserTaskProxy })
  public async getOne(@Param('id') id: number, @ParsedRequest() crudRequest: CrudRequest): Promise<UserTaskProxy> {
    return await this.service.get(+id).then(response => response.toProxy());
  }

  @hasPermissions(UsersPermissions.ADMIN, UsersPermissions.USER)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Create a user task' })
  @ApiOkResponse({ type: UserTaskProxy })
  public async createOne(@Request() req: any, @Body() payload: CreateUserTaskPayload): Promise<UserTaskProxy> {
    return await this.service.create(req.user, payload).then(response => response.toProxy());
  }

  @hasPermissions(UsersPermissions.USER, UsersPermissions.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Update a user task' })
  @ApiOkResponse({ type: TaskProxy })
  public async replaceOne(@Param('id') id: string, @Body() payload: CreateUserTaskPayload): Promise<UserTaskProxy> {
    return await this.service.update(+id, payload).then(response => response.toProxy());
  }
}
