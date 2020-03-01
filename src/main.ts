import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as requestIp from 'request-ip';
import { Logger } from '@nestjs/common';

const port = process.env.PORT || 5500;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.use(requestIp.mw());
  await app.listen(port);
  Logger.log(`Server running on port ${port}`)
}
bootstrap();
