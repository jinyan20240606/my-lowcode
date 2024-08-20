import { NestFactory } from '@nestjs/core';
import { PUserModule } from './user.module';
import { generateDocument } from './doc';

async function bootstrap() {
  const app = await NestFactory.create(PUserModule);

  
  // 创建文档
  generateDocument(app)

  await app.listen(3002);
}
bootstrap();
