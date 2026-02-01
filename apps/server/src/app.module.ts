import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import { UsersModule } from './users/users.module.js';
import { TodosModule } from './todos/todos.module.js';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UsersModule, TodosModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
