import { ApiProperty } from '@nestjs/swagger';

export class Task {

  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  completed: boolean;
}