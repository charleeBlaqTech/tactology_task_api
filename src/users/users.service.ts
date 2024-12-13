import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  async create(data: User): Promise<User | any> {
      const username_exist = await this.findOneByUsername(data?.username)
      if(username_exist.username === data?.username){
        return {message: `User with the username ${data?.username} already exist`}
      }else{
        const salt = 10;
        const password = data.password;
        const hash = await bcrypt.hash(password, salt);
        return this.users.save({...data, password: hash});
      }
  }

  async find(): Promise<User[] | undefined> {
    return this.users.find();
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.users.findOneBy({id: id});
  }
  async findOneByUsername(username: string): Promise<User | undefined> {
    return await this.users.findOneBy({username: username})
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.users.findOneBy({email: email})
  }

  async userProfile(id: number): Promise<User | undefined> {
    return this.users.findOneBy({id: id});
  }
}