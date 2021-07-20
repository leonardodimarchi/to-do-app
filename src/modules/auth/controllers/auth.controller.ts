import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginPayload } from '../models/login-payload';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  @ApiUnauthorizedResponse({ description: 'A senha enviada está incorreta.' })
  @ApiNotFoundResponse({ description: 'Não foi encontrado nenhum usuário com o e-mail enviado.' })
  @UseGuards(LocalAuthGuard)
  @Post('local')
  public async login(@Request() req: any, @Body() loginPayload: LoginPayload) {
    return req.user;
  }
}
