import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });
  app.use((req, res, next) => {
    console.log('CORS headers:', res.getHeaders());
    next();
  });

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
