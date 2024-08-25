// oauth.strategy.ts

import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Query, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-custom';

// 自定义策略
@Injectable()
export class GithubStrategy  extends PassportStrategy(Strategy, 'github') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req): Promise<any> {
    const q: any = req.query;
    console.log(q, '17-------')

    const user = await this.authService.validateGithubUser(q.code as string);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
