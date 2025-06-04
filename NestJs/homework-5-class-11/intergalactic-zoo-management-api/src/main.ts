import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform:true,
      
      
    })
  );
  const config = new DocumentBuilder()
  .setTitle('Intergalactic Zoo Management API')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app , document);
  
  const port: number = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(
    `Server is running on http://localhost:${port}, and swagger is running on http://localhost:${port}/api`
  )
}
bootstrap();
