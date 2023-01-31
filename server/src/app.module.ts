import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Task } from './todo/task.entity';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'todo-app-db', // todo-app-db
      port: 3306,
      username: 'user',
      password: '123',
      database: 'todo-app',
      entities: [User, Task],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
