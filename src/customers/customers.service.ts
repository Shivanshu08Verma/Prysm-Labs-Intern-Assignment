import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateCustomerDto) {
    const exists = await this.prisma.customer.findFirst({
      where: { OR: [{ email: dto.email }, { phone: dto.phone }] },
    });
    if (exists) throw new ConflictException('Email or Phone already exists');
    return this.prisma.customer.create({ data: dto });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.customer.findMany({ skip, take: limit }),
      this.prisma.customer.count(),
    ]);

    return {
      data,
      totalRecords: total,
      totalPages: Math.ceil(total / limit),
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async update(id: number, dto: UpdateCustomerDto) {
    await this.findOne(id); 
    return this.prisma.customer.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.customer.delete({ where: { id } });
  }
}