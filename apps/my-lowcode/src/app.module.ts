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
    // 引入配置模块load自定义配置后，就可以在各个位置引用其ConfigService方法来获取环境变量方便
    // import { ConfigService } from '@nestjs/config';
    // 不引他的话，也可以自行在业务文件引getConfig执行获取总环境对象
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
