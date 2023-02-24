import { ConfigService } from '@nestjs/config/dist';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const port  = configService.get<number>(SERVER_PORT);
  await app.listen(port);
  console.log(`Listening on port ${await app.getUrl()}`)
}
bootstrap();
