import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '../../users/entities/user.entity';
import { jwtConstants } from '../constants/constants';
import { JwtPayload } from '../models/jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      jsonWebTokenOptions: {
        expiresIn: jwtConstants.expiresIn,
      },
    });
  }

  async validate(jwtPayload: JwtPayload): Promise<any> {
    const user = await UserEntity.findById<UserEntity>(jwtPayload.id);

    if (!user)
      throw new UnauthorizedException('Usuário desativado ou removido.');

    return user;
  }
}
