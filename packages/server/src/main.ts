import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// https://www.npmjs.com/package/node-json-db
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3003);
}
bootstrap();
