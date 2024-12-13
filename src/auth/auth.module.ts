import { Module, Global } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
// import { UserEntity } from './user.entity';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'yourSecretKey', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtAuthGuard, JwtService, UsersService],
  controllers: [AuthController],
  exports: [JwtAuthGuard, AuthService],
})
export class AuthModule {}
