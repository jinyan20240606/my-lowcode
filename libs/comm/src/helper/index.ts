import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PayloadUser = createParamDecorator(
    (data, ctx: ExecutionContext): IPayloadUser => {
      // 获取当前http请求的对象
      const request = ctx.switchToHttp().getRequest();
      // console.log(data, request, '6-------')
      // 如果在守卫中间件中赋值了user属性就使用
      if (request.user) {
        return request.user;
      } else {
        return {
          userId: 1,
          username: 'cookie',
          name: 'cookie',
          email: 'cookie@qq.com',
        };
      }
    },
  );