import { Controller, Get, Res, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { OAuthGuard } from './guards/oauth.guard';
import { PayloadUser } from '@app/comm';

@ApiTags('用户认证')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Github OAUTH 授权',
  })
  @Public()
  @UseGuards(OAuthGuard)
  @Get('/github')
  @ApiQuery({ name: 'code', description: '授权回调 code' })
  async OAuthGithub(
    @PayloadUser() user: IPayloadUser,
    @Res({ passthrough: true }) response,
    // @Query('code') code: string,
    // @Res({ passthrough: true }) response,
  ) {
    // console.log(code, '23----------')
    // return this.authService.validateGithubUser(code);

    console.log(user, '【OAuthGithub】：user值')
    // 1、通过守卫生产的user信息来生成jwt加密token
    const { access_token } = await this.authService.login(user);
    // 2、将token种在客户端cookie下保存
    console.log(access_token, '31-----')
    response.cookie('jwt', access_token, {
      path: '/',
      httpOnly: true,
      domain: '.mylowcode.com'
    });
    return 'jwt种植成功'
  }
}
