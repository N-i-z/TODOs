import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  listAll() {
    return this.prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  getById(id: number) {
    return this.prisma.todo.findUnique({ where: { id } });
  }

  create(data: {
    title: string;
    description?: string;
    completed?: boolean;
    priority?: string;
    userId?: number;
  }) {
    return this.prisma.todo.create({ data });
  }

  update(id: number, data: { title?: string; description?: string }) {
    return this.prisma.todo.update({ where: { id }, data });
  }

  markDone(id: number) {
    return this.prisma.todo.update({
      where: { id },
      data: { completed: true, status: 'completed' },
    });
  }

  markUndone(id: number) {
    return this.prisma.todo.update({
      where: { id },
      data: { completed: false, status: 'pending' },
    });
  }

  softDelete(id: number) {
    return this.prisma.todo.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  restore(id: number) {
    return this.prisma.todo.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  hardDelete(id: number) {
    return this.prisma.todo.delete({ where: { id } });
  }
}
