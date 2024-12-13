import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,  private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if(!user){
      return {message: `User with the Username ${username} not Found`}
    }
    const isMatch = await bcrypt.compare(pass, user?.password);
    if ( !isMatch) {
      return {message: `Password Mismatch or Username ${username} not Found`}
    }
    const { password, ...result } = user;
    const payload = { sub: user.id, user: user.username};
    const token = await this.jwtService.signAsync(payload)
    return {
      access_token: token ,
      user: result
    };
  }
}