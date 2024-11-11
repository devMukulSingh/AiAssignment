import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { base_url_client } from './lib/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:{origin:base_url_client}});
  const PORT = process.env.PORT || 8000
  await app.listen(PORT)
  console.log(`Server running at PORT ${PORT} `);
  
}
bootstrap();
