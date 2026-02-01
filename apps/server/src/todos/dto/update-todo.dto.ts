import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiProperty({ example: 'Develop new feature', required: false })
  title?: string;

  @ApiProperty({ example: 'Instructions of the new feature', required: false })
  description?: string;
}
