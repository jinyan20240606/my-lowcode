import { Injectable, } from '@nestjs/common';
import { getGithubToken, getGithubUser } from '../helper/github/auth';
import * as querystring from 'querystring'

@Injectable()
export class OAuthService {

  async getUserToken(code: string) {
    const res: any = await getGithubToken({ code });
    const params = querystring.parse(res)
    const userRes =  this.getOathUser(params.access_token as string);
    return userRes;
  }

  async getOathUser(token: string) {
    return getGithubUser({ token })
  }
}

