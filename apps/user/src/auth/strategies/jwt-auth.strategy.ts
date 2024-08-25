// jwt-auth.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

const cookieExtractor = function (req) {
  let token = null;
  // 需要引入cookie-parser中间件，才会赋值cookies属性
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

// 定义jwt策略的回调函数
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: jwtConstants.ignoreExpiration,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<any> {
    console.log(payload, '27-------')
    return { ...payload };
  }
}

