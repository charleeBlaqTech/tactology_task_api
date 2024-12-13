import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export const jwtConstants = {
  secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};