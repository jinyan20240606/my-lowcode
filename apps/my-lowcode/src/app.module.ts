import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { getConfig } from './utils';
import {UserModule} from './user/user.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig]
    }),
    // 导入用户模块
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
