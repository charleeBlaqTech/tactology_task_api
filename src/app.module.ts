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
import { Sub_Departments} from './departments/subdepartment.entity';


@Module({
  imports: [DepartmentsModule, UsersModule, AuthModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'charleeblaq1994',
    database: 'tactology_db',
    entities: [Department, Sub_Departments, User],
    synchronize: true,
  })],
  providers: [AppService],
  controllers: [AppController]
})

export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude()
      .forRoutes('cats');
  }
}

