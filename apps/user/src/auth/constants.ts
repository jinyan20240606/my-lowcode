import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'yx-yyds', // 秘钥，不对外公开。
  expiresIn: '15s', // 时效时长
  ignoreExpiration: true, // 是否忽略 token 时效
};

export const IS_PUBLIC_KEY = 'isPublic';

// 用元编程（基于reflect-metadata库）能力存储的元数据描述信息
// 白名单加白装饰器，用于jwt全局守卫中通行策略
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);