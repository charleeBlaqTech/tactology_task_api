import { Module, Global } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@Global()
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_JWT || 'yourSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtAuthGuard],
  controllers: [AuthController],
  exports: [JwtAuthGuard, AuthService],
})
export class AuthModule {}
