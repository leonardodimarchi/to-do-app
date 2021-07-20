import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { LoginPayload } from '../models/login-payload';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor() { }

    public async validateUser({ email, password }: LoginPayload): Promise<Partial<UserEntity>> {
        const { password: encryptedPassword, ...searchedUser } = await UserEntity.getActiveUserByEmail(email);

        const isPasswordMatching = await bcryptjs.compare(password, encryptedPassword);

        if (!isPasswordMatching)
            throw new UnauthorizedException('A combinação de e-mail e senha enviada está incorreta.');

        return searchedUser;
    }

}
