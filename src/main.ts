import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import './db/sqlLite3';
import * as express from 'express';

// const server = express();
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: false }));
// server.use(cors());

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  await app.listen(4000);
}
bootstrap();
