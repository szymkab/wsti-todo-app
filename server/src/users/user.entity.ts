import { Task } from 'src/todo/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
