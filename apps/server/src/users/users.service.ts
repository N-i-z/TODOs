import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async sync(email: string, name?: string) {
    return this.prisma.user.upsert({
      where: { email },
      update: { name: name ?? undefined },
      create: { email, name: name ?? undefined },
    });
  }
}
