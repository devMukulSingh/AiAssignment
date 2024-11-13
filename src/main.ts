import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { base_url_client } from './lib/utils';
import { ValidationPipe } from '@nestjs/common';
import { clerkMiddleware } from '@clerk/express';
import { getBotToken } from 'nestjs-telegraf';

async function bootstrap() {
  const PORT = process.env.PORT || 8000;
  const app = await NestFactory.create(AppModule , {cors:{ origin:base_url_client }});
  const bot = app.get(getBotToken('weatherUpdate'));

  app.useGlobalPipes(new ValidationPipe( ) );
  app.use(bot.webhookCallback('/'));
  app.use(
    clerkMiddleware({
      authorizedParties: [base_url_client],
      publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
    }), 
  );
  app.enableCors({
    origin: base_url_client,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],

  });
  await app.listen(PORT);
  console.log(`Server running at PORT ${PORT} `);
}
bootstrap();
