//#region Imports

import { Body, ClassSerializerInterceptor, Controller, Get, Param, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { BaseEntityCrudController } from '../../../common/base-entity-crud.controller';
import { User } from '../../../decorators/user.decorator';
import { UsersPermissions } from '../../../models/enums/users-permissions';
import { hasPermissions } from '../../auth/decorators/has-permissions.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../auth/guards/permissions.guard';
import { TaskProxy } from '../../tasks/models/task.proxy';
import { UserEntity } from '../entities/user.entity';
import { CreateUserPayload } from '../models/create-user.payload';
import { UpdateUserPayload } from '../models/update-user.payload';
import { GetManyDefaultResponseUserProxy, UserProxy } from '../models/user.proxy';
import { UserService } from '../services/user.service';

//#endregion

@ApiBearerAuth()
@Crud({
  model: {
    type: UserEntity,
  },
  query: {
    exclude: [
      'password'
    ]
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
@ApiTags('users')
@Controller('users')
export class UserController extends BaseEntityCrudController<UserEntity, UserService> {
  constructor(
    public service: UserService,
  ) {
    super(service);
  }

  @hasPermissions(UsersPermissions.ADMIN, UsersPermissions.USER)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiOperation({ summary: 'Get logged user info.' })
  @Get('me')
  @ApiOkResponse({ description: 'Getting logged user information.', type: UserProxy })
  public async getMe(@User() user: UserEntity): Promise<UserProxy> {
    return user.toProxy();
  }

  @hasPermissions(UsersPermissions.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: GetManyDefaultResponseUserProxy })
  public async getMany(@User() user: UserEntity, @ParsedRequest() crudRequest: CrudRequest): Promise<GetManyDefaultResponseUserProxy | UserProxy[]> {
    return await this.service.listMany(user, crudRequest);
  }

  @hasPermissions(UsersPermissions.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiOkResponse({ type: TaskProxy })
  public async getOne(@Param('id') id: number, @ParsedRequest() crudRequest: CrudRequest): Promise<UserProxy> {
    return await this.service.get(+id).then(response => response.toProxy());
  }

  @Override()
  @ApiOperation({ summary: 'Create a user' })
  @ApiOkResponse({ type: TaskProxy })
  public async createOne(@Body() payload: CreateUserPayload): Promise<UserProxy> {
    return await this.service.create(payload).then(response => response.toProxy());
  }

  @hasPermissions(UsersPermissions.USER, UsersPermissions.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Override()
  @ApiOperation({ summary: 'Update a user' })
  @ApiOkResponse({ type: TaskProxy })
  public async replaceOne(@Param('id') id: string, @Body() payload: UpdateUserPayload): Promise<UserProxy> {
    return await this.service.update(+id, payload).then(response => response.toProxy());
  }
}
