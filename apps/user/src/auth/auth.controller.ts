import { Controller, Get, Res, Query } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('用户认证')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Github OAUTH 授权',
  })

  @Get('/github')
  @ApiQuery({ name: 'code', description: '授权回调 code' })
  async OAuthGithub(
    @Query('code') code: string,
    @Res({ passthrough: true }) response,
  ) {
    // console.log(code, '23----------')
    return this.authService.validateGithubUser(code);
  }
}
