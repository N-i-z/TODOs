import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service.js';
import { CreateTodoDto } from './dto/create-todo.dto.js';
import { UpdateTodoDto } from './dto/update-todo.dto.js';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('todos')
@ApiTags('Todo Module')
export class TodosController {
  constructor(private readonly todos: TodosService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'List all todos.' })
  async list() {
    return this.todos.listAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Get a todo by id.' })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.todos.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateTodoDto })
  @ApiResponse({ status: 201, description: 'Create a new todo.' })
  async create(@Body() dto: CreateTodoDto) {
    return this.todos.create(dto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UpdateTodoDto })
  @ApiResponse({ status: 200, description: 'Update todo title/description.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTodoDto,
  ) {
    return this.todos.update(id, dto);
  }

  @Patch(':id/done')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Mark todo as done.' })
  async done(@Param('id', ParseIntPipe) id: number) {
    return this.todos.markDone(id);
  }

  @Patch(':id/undone')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Mark todo as yet to be done.' })
  async undone(@Param('id', ParseIntPipe) id: number) {
    return this.todos.markUndone(id);
  }

  @Patch(':id/restore')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Restore a soft-deleted todo.' })
  async restore(@Param('id', ParseIntPipe) id: number) {
    return this.todos.restore(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Soft delete todo.' })
  async softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.todos.softDelete(id);
  }

  @Delete(':id/hard')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Hard delete todo.' })
  async hardDelete(@Param('id', ParseIntPipe) id: number) {
    return this.todos.hardDelete(id);
  }
}
