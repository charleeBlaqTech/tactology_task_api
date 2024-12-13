import { Module, RequestMethod, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DepartmentsModule } from './departments/departments.module';
import { LoggerMiddleware } from './common/middlewares/auth.logger.middleware';

@Module({
  imports: [DepartmentsModule],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude()
      .forRoutes('cats');
  }
}
