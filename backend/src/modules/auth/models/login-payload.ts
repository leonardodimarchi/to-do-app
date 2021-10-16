import { ApiProperty } from '@nestjs/swagger';

export class LoginPayload {
    @ApiProperty()
    nickname: string;

    @ApiProperty()
    password: string;
}
