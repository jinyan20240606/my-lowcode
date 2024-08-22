import { Injectable } from '@nestjs/common';
import { GithubUserInfo } from '../user/dto/create-user.dto';
import { OAuthService } from '../user/oauth.service';
import { User } from '../user/entities/user.mysql.entity';
import { UserService } from '../user/user.service';

// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    // private jwtService: JwtService,
    private oAuthService: OAuthService,
    private userService: UserService
  ) { }

  async validateGithubUser(code: string) {
    console.log(code, 'auth-service-login方法')
    // 1、通过授权回调code去github服务器获取github用户详情信息
    const userInfo: GithubUserInfo = await this.getOAuthTokenByApplications(code);

    // 2、将信息同步到user数据库对应表里
    const user: User = await this.userService.createOrUpdateByOAoth(
      userInfo,
    );
    // console.log(user, '26-------')

    // 3、返回 数据库里同步后的最终的用户信息
    return user;
  }

  async getOAuthTokenByApplications(code: string) {

    const oauth = await this.oAuthService.getUserToken(code);
    return oauth;
  }
}
