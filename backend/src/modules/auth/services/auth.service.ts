import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../users/entities/user.entity';
import { LoginPayload } from '../models/login-payload';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(
      private readonly jwtService: JwtService,
    ) { }

    public async login(user: Partial<UserEntity>): Promise<{ access_token: string }> {
        const { id, permissions, createdAt, updatedAt, isActive } = user;

        return {
            access_token: this.jwtService.sign(user),
        }
    }

    public async validateUser({ email, password }: LoginPayload): Promise<Partial<UserEntity>> {
        const { password: encryptedPassword, ...searchedUser } = await UserEntity.getActiveUserByEmail(email);

        const isPasswordMatching = await bcryptjs.compare(password, encryptedPassword);

        if (!isPasswordMatching)
            throw new UnauthorizedException('A combinação de e-mail e senha enviada está incorreta.');

        return searchedUser;
    }

}
