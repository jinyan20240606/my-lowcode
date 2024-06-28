import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-custom';

@Injectable()
export class OAuthStrategy extends PassportStrategy(Strategy, 'oauth') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req): Promise<IPayloadUser> {
    const q: any = req.query;

    const user = await this.authService.validateGithubUser(q.code as string);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
