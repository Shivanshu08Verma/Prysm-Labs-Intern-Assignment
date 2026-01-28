import { Controller, Get, Post, Body, Patch, Param, Request, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.tasksService.findAll(req.user);
  }

  @Patch(':id/status')
  @ApiBody({ schema: { example: { status: 'DONE' } } })
  updateStatus(@Param('id') id: string, @Body('status') status: any, @Request() req) {
    return this.tasksService.updateStatus(+id, status, req.user);
  }
}