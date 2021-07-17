import { ClassSerializerInterceptor, Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { BaseEntityCrudController } from '../../../common/base-entity-crud.controller';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

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

}
