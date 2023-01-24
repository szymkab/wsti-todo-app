import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, User } from 'src/users/user.entity';
import { UsersService } from '../users/users.service';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    hashedPassword: string,
  ): Promise<Omit<User, 'password'>> {
    try {
      const { password, ...user } = await this.usersService.findOneWithPassword(
        username,
      );
      const isPasswordMatching = await compare(hashedPassword, password);
      if (!isPasswordMatching) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(user: Omit<User, 'password'>) {
    const payload = {
      username: user.username,
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return {
      username: user.username,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      access_token: this.jwtService.sign(payload),
    };
  }

  public async register(createUserDto: CreateUserDto) {
    const hashedPassword = await hash(createUserDto.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...createUserDto,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === 23505) {
        throw new HttpException(
          'User with that username already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
