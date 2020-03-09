import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import * as requestIp from 'request-ip';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import { TransformInterceptor } from './shared/transform.interceptor';
import { AllExceptionsFilter } from './shared/exceptions.filter';

const port = process.env.PORT || 5500;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.setGlobalPrefix('api')
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter())
  app.use(requestIp.mw());
  await app.listen(port);
  Logger.log(`Server running on port ${port}`)
}
bootstrap();
