import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

//dotenv configuration
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Products RESTful API')
    .setDescription('Webapp for products db CRUD operations')
    .setVersion('1.0')
    .addTag('products')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  //validation pipes
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000, ()=>{console.log(`nestjs server up and running on port ${process.env.PORT ?? 3000}`)});
}
bootstrap();
