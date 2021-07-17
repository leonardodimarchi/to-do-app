//#region Imports

import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudRequest, GetManyDefaultResponse, Override, ParsedRequest } from '@nestjsx/crud';
import { BaseEntityCrudController } from '../../../common/base-entity-crud.controller';
import { TaskEntity } from '../entities/task.entity';
import { CreateTaskPayload } from '../models/create-task.payload';
import { UpdateTaskPayload } from '../models/update-task.payload';
import { TaskService } from '../services/task.service';
import { GetManyDefaultResponseTaskProxy, TaskProxy } from '../models/task.proxy';

//#endregion

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

  @Override()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiOkResponse({ type: GetManyDefaultResponseTaskProxy })
  public async getMany(@ParsedRequest() crudRequest: CrudRequest): Promise<GetManyDefaultResponseTaskProxy | TaskProxy[]> {
    return await this.service.listMany(crudRequest);
  }

  @Override()
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiOkResponse({ type: TaskProxy })
  public async getOne(@Param('id') id: number, @ParsedRequest() crudRequest: CrudRequest): Promise<TaskProxy> {
    return await this.service.get(+id).then(response => response.toProxy());
  }

  @Override()
  @ApiOperation({ summary: 'Create a task' })
  @ApiOkResponse({ type: TaskProxy })
  public async createOne(@Body() payload: CreateTaskPayload): Promise<TaskProxy> {
    return await this.service.create(payload).then(response => response.toProxy());
  }

  @Override()
  @ApiOperation({ summary: 'Update a task' })
  @ApiOkResponse({ type: TaskProxy })
  public async replaceOne(@Param('id') id: string, @Body() payload: UpdateTaskPayload): Promise<TaskProxy> {
    return await this.service.update(+id, payload).then(response => response.toProxy());
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  public async deleteOne(@Param('id') id: string): Promise<TaskProxy> {
    return await this.service.delete(+id).then(response => response.toProxy());
  }
}
