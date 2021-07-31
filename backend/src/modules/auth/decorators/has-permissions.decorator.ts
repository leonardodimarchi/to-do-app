import { SetMetadata } from '@nestjs/common';

export const hasPermissions = (...hasPermissions: string[]) => SetMetadata('permissions', hasPermissions);
