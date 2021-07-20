import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  require('dotenv').config();

  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_NAME)
    .setDescription(process.env.SWAGGER_DESC)
    .setVersion(process.env.SWAGGER_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.SWAGGER_PATH, app, document);

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
