import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OAuthService } from '../user/oauth.service';
import { UserService } from '../user/user.service';
import { UserProviders } from '../user/user.providers';
import { DepartmentModule } from '../department/department.module';
// nest-cli的library能力自动映射
import { DatabaseModule } from '@app/comm/database/database.module';

@Module({
  imports: [DatabaseModule, DepartmentModule],
  controllers: [AuthController],
  providers: [...UserProviders, AuthService, OAuthService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
