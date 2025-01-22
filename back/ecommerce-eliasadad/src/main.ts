import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalLogger } from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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


  const swaggerConfig = new DocumentBuilder()
    .setTitle("E-commerce M4")
    .setDescription("This is an e-commerce API builded with NestJS for the M4.")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup("api", app, document)


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
