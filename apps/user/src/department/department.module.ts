import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
// nest-cli的library能力自动映射
import { DatabaseModule } from '@app/comm/database/database.module';
import { DepartmentProviders } from './department.providers';

@Module({
  imports: [
    // 为当前user模块注册数据库基础模块
    DatabaseModule
  ],
  controllers: [DepartmentController],
  providers: [...DepartmentProviders, DepartmentService],
  exports: [DepartmentService]
})
export class DepartmentModule {}
