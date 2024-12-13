// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UserEntity } from './user.entity';

// @Injectable()
// export class AuthService {
//   constructor(private readonly jwtService: JwtService) {}

//   async login(user: UserEntity) {
//     const payload = { username: user.username, sub: user.id };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }

//   // Validate user (you would use a real service here, querying the database)
//   async validateUser(username: string, password: string): Promise<UserEntity> {
//     // In a real application, you'd query the database to check credentials
//     const user = new UserEntity(); // Mock user, replace with actual query
//     user.username = 'admin';
//     user.password = 'password'; // Encrypt password in real apps!
//     return user;
//   }
// }

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersController } from 'src/users/users.controller';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,  private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(pass, user?.password);
    if ( !isMatch) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    const payload = { sub: user.userId, user: user.username };
    const token = await this.jwtService.signAsync(payload)
    return {
      access_token: token ,
      user: result
    };
  }
}