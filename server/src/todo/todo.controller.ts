import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TodoService } from './todo.service';
import { CreateTaskDto, Task, UpdateTaskDto } from './task.entity';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Task[]> {
    return this.todoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param() params): Promise<Task | undefined> {
    return this.todoService.findOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createDto: CreateTaskDto): Promise<Task> {
    return this.todoService.create(createDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Request() req, @Body() updateDto: UpdateTaskDto) {
    this.todoService.update(updateDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param() params) {
    this.todoService.remove(params.id);
  }
}
