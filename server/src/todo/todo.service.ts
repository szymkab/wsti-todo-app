import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto, Task, UpdateTaskDto } from './task.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  private mapUserIdToUser(userId: number) {
    const user = new User();
    user.id = userId;
    return user;
  }

  findAll(user: User): Promise<Task[]> {
    return this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user')
      .where('user.id = :userId', { userId: user.id })
      .getMany();
  }

  findOne(id: string): Promise<Task> {
    return this.tasksRepository.findOneBy({ id: Number(id) });
  }

  async remove(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }

  create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.save(
      this.tasksRepository.create({
        ...createTaskDto,
        user: this.mapUserIdToUser(user.id),
      }),
    );
  }

  update(updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.save({
      ...updateTaskDto,
      user: this.mapUserIdToUser(user.id),
    });
  }
}
