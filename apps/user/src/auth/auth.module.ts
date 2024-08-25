import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OAuthService } from '../user/oauth.service';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { UserProviders } from '../user/user.providers';
import { DepartmentModule } from '../department/department.module';
// nest-cli的library能力自动映射
import { DatabaseModule } from '@app/comm/database/database.module';

import { GithubStrategy } from './strategies/oauth.strategy';

@Module({
  imports: [DatabaseModule, DepartmentModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),

  ],
  controllers: [AuthController],
  providers: [...UserProviders, AuthService, OAuthService, UserService, GithubStrategy],
  exports: [AuthService],
})
export class AuthModule {}
