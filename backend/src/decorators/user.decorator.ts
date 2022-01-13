//#region Imports

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//#endregion

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
