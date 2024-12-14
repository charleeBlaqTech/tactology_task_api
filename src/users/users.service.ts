import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UserType } from './user.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  async create(data: UserType): Promise<User | any> {
      try {
        const salt = 10;
        const password = data.password;
        const hash = await bcrypt.hash(password, salt);
        return await this.users.save({...data, password: hash});
       } catch (error) {
        if(error.code === '23505'){
          throw new ConflictException(`User with ${data.username || data.email} already exist.`)
        }
        throw error
       }
  }

  async find(): Promise<User[] | undefined> {
    return await this.users.find();
  }

  async findUser(username: string): Promise<User | undefined> {
    const user = await this.users.findOne({ where: { username: username } }); 
    if (!user) { 
      throw new Error(`User with ${username} not found.`);
    } 
    return user
  }

}