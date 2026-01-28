import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsInt()
  assignedToId: number;

  @ApiProperty()
  @IsInt()
  customerId: number;
}