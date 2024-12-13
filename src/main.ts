import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false, cors: true });
  // app.use("yes");
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
