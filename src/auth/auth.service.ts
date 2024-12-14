import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,  private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<string> {
    const user = await this.usersService.findUser(username);
    if (!user) { 
      throw new Error(`User with ${username} not found.`);
    } 
    const isMatch = await bcrypt.compare(pass, user?.password);
    if ( !isMatch) {
      throw new Error(`Password Mismatch or Username ${username} not Found`)
    }
    const { password, ...result } = user;
    const payload = { sub: user.id, user: user.username};
    const token = await this.jwtService.signAsync(payload)
    return  token;
  }
}