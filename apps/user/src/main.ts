import { NestFactory } from '@nestjs/core';
import { PUserModule } from './user.module';
import { generateDocument } from './doc';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(PUserModule);

  // 设置全局接口前缀
  app.setGlobalPrefix('api');

  // 创建文档
  generateDocument(app)

  // 格式化 cookie
  app.use(cookieParser());

  await app.listen(3002);
}
bootstrap();
