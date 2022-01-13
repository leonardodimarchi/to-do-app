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
import { UserEntity } from '../../users/entities/user.entity';
import { TaskEntity } from '../entities/task.entity';
import { CreateTaskPayload } from '../models/create-task.payload';
import { GetManyDefaultResponseTaskProxy, TaskProxy } from '../models/task.proxy';
import { UpdateTaskPayload } from '../models/update-task.payload';
import { TaskService } from '../services/task.service';

//#endregion

@ApiBearerAuth()
@Crud({
  model: {
    type: TaskEntity,
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
@ApiTags('tasks')
@Controller('tasks')
export class TaskController extends BaseEntityCrudController<TaskEntity, TaskService> {
  constructor(
    public service: TaskService,
  ) {
    super(service);
  }

  @hasPermissions(UsersPermissions.USER, UsersPermissions.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiOkResponse({ type: GetManyDefaultResponseTaskProxy })
  public async getMany(@User() user: UserEntity, @ParsedRequest() crudRequest: CrudRequest): Promise<GetManyDefaultResponseTaskProxy | TaskProxy[]> {
    return await this.service.listMany(crudRequest, user);
  }

  @hasPermissions(UsersPermissions.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiOkResponse({ type: TaskProxy })
  public async getOne(@Param('id') id: number, @ParsedRequest() crudRequest: CrudRequest): Promise<TaskProxy> {
    return await this.service.get(+id).then(response => response.toProxy());
  }

  @hasPermissions(UsersPermissions.USER, UsersPermissions.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Create a task' })
  @ApiOkResponse({ type: TaskProxy })
  public async createOne(@Body() payload: CreateTaskPayload): Promise<TaskProxy> {
    return await this.service.create(payload).then(response => response.toProxy());
  }

  @hasPermissions(UsersPermissions.USER, UsersPermissions.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Update a task' })
  @ApiOkResponse({ type: TaskProxy })
  public async replaceOne(@Param('id') id: string, @Body() payload: UpdateTaskPayload): Promise<TaskProxy> {
    return await this.service.update(+id, payload).then(response => response.toProxy());
  }

  @hasPermissions(UsersPermissions.USER, UsersPermissions.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  public async deleteOne(@Param('id') id: string, @User() user: UserEntity): Promise<TaskProxy> {
    return await this.service.delete(+id, user).then(response => response.toProxy());
  }
}
