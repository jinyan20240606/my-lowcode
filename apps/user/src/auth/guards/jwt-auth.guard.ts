// jwt-auth.guard.ts
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { BUSINESS_ERROR_CODE, BusinessException } from '@app/comm';
import { IS_PUBLIC_KEY } from '../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    console.log('15-------JwtAuthGuard', context.getHandler().toString())
    // Reflector 类来检查当前处理路由的控制器函数和类是否被标记为公共（public），也就是说是否允许未认证的用户访问
    const loginAuth = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),// 控制器方法@Get装饰的方法
      context.getClass(),// 控制器类@Controller装饰的类
    ]);
    console.log(loginAuth, '21--JwtAuthGuard-loginAuth')

    if (loginAuth) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw (
        err ||
        new BusinessException({
          code: BUSINESS_ERROR_CODE.TOKEN_INVALID,
          message: 'token 已失效',
        })
      );
    }
    return user;
  }
}
