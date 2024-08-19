import { Module } from '@nestjs/common';
// nest-cli的library能力自动映射
import { DatabaseModule } from '@app/comm/database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserProviders } from './user.providers';
// import { FeishuController } from './feishu/feishu.controller';
// import { FeishuService } from './feishu/feishu.service';

@Module({
  imports: [
    // 为当前user模块注册数据库基础模块
    DatabaseModule
  ],
  // 注册用户控制器
  controllers: [
    // FeishuController,
    UserController
  ],
  // 注册用户提供者们
  providers: [
    // 为当前user模块注册User实体
    ...UserProviders,
    UserService,
    // FeishuService
],
// 导出UserService供其他模块使用
  exports: [UserService],
})
export class UserModule { }
