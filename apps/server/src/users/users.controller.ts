import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('User Module')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('user')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User synced (created or updated).',
  })
  async sync(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto?.email) {
      return { success: false, error: 'email is required' };
    }
    const user = await this.usersService.sync(
      createUserDto.email,
      createUserDto.name,
    );
    return { success: true, user };
  }
}
