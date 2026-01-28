import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    const user = await this.prisma.user.findUnique({ where: { id: dto.assignedToId } });
    if (!user || user.role !== 'EMPLOYEE') throw new NotFoundException('Assigned user must be an EMPLOYEE');
    const customer = await this.prisma.customer.findUnique({ where: { id: dto.customerId } });
    if (!customer) throw new NotFoundException('Customer not found');

    return this.prisma.task.create({
      data: { ...dto, status: 'PENDING' },
    });
  }

  async findAll(user: any) {
    const whereClause = user.role === 'ADMIN' ? {} : { assignedToId: user.userId };

    return this.prisma.task.findMany({
      where: whereClause,
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        customer: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async updateStatus(id: number, status: 'PENDING' | 'IN_PROGRESS' | 'DONE', user: any) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    if (user.role === 'EMPLOYEE' && task.assignedToId !== user.userId) {
      throw new ForbiddenException('You can only update your own tasks');
    }

    return this.prisma.task.update({
      where: { id },
      data: { status },
    });
  }
}