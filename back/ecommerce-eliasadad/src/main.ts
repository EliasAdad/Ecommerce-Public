import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalLogger } from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(globalLogger)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    exceptionFactory: (errors) => {
      const cleanErrors = errors.map((error) => {
        return { property: error.property, constraints: error.constraints }
      })

      return new BadRequestException({
        alert: "Some errors have been detected in your request",
        errors: cleanErrors
      })
    },
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
