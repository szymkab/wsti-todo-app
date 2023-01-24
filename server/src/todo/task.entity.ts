import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';

export enum TaskStatus {
  ToDo,
  Done,
}

export interface CreateTaskDto {
  description: string;
  status: TaskStatus;
}

export interface UpdateTaskDto {
  id: number;
  description: string;
  status: TaskStatus;
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.ToDo })
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinTable()
  user: User;
}
