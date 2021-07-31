import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginPayload } from '../models/login-payload';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @ApiUnauthorizedResponse({ description: 'A senha enviada está incorreta.' })
  @ApiNotFoundResponse({ description: 'Não foi encontrado nenhum usuário com o e-mail enviado.' })
  @UseGuards(LocalAuthGuard)
  @Post('local')
  public async login(@Request() req: any, @Body() loginPayload: LoginPayload): Promise<{ access_token: string }> {
    return await this.authService.login(req.user);
  }
}
