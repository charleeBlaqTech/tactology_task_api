import { Module, RequestMethod, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DepartmentsModule } from './departments/departments.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middlewares/auth.logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controllers';
import { AppService } from './app.service';
import { User } from './users/users.entity';
import { Department } from './departments/departments.entity';
import { Sub_Departments } from './departments/subdepartment.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Makes config globally accessible
    }),

    // Initialize TypeORM with environment variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST') || 'dpg-cte54v3tq21c7381lcn0-a',
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true, 
        synchronize: true, 
      }),
    }),
    TypeOrmModule.forFeature([User, Department, Sub_Departments]),

    DepartmentsModule, UsersModule, AuthModule, ConfigModule
  ],
  providers: [AppService],
  controllers: [AppController]
})

export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) { }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude()
      .forRoutes('cats');
  }
}

