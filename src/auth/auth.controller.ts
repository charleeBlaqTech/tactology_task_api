import { Body, Controller, Post, HttpCode, HttpStatus,
  Get,
  Request,
  UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.username, loginDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
