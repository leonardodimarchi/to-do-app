import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    LocalStrategy,
  ],
})
export class AuthModule {}
