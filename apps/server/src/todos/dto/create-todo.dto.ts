import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ example: 'Develop new feature' })
  title: string;

  @ApiProperty({
    example: 'detailed instructions of the new feature',
    required: false,
  })
  description?: string;

  @ApiProperty({ example: false, required: false })
  completed?: boolean;

  @ApiProperty({
    example: 'medium',
    required: false,
    enum: ['low', 'medium', 'high'],
  })
  priority?: string;

  @ApiProperty({ example: 1, required: false })
  userId?: number;
}
