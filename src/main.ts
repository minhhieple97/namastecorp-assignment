import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api/v1');
  const configService = app.get(ConfigService);
  const validationPipe = new ValidationPipe({
    transform: true,
    disableErrorMessages: configService.get('NODE_ENV') === 'production',
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors: ValidationError[]) => {
      const messages = errors.map((error) => Object.values(error.constraints));
      return new BadRequestException(messages);
    },
  });
  app.useGlobalPipes(validationPipe);
  await app.listen(3000);
}
bootstrap();
