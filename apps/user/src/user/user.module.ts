import { Module } from '@nestjs/common';
// nest-cli的library能力自动映射
import { DatabaseModule } from '@app/comm/database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProviders } from './user.providers';
import { DepartmentModule } from '../department/department.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    // 为当前user模块注册数据库基础模块
    DatabaseModule,
    DepartmentModule,
    AuthModule
  ],
  controllers: [UserController],
  providers: [...UserProviders, UserService],
})
export class UserModule {}
