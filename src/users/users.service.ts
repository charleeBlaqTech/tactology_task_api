import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async create(data: User): Promise<User | undefined> {
      const salt = 10;
      const password = data.username;
      const hash = await bcrypt.hash(password, salt);
    return this.users.find(data => data.username === data.username);
  }
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}