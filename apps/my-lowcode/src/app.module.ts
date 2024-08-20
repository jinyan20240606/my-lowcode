import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { getConfig } from './utils';
// import {UserModule} from './user-demo/user.module'
import { SiteModule } from './site/site.module';
import { PageModule } from './page/page.module';
import { DatabaseModule } from '@app/comm/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig]
    }),
    SiteModule,
    PageModule,
    // // 导入用户模块
    // UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
