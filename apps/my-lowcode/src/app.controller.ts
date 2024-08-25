import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
// import { BusinessException } from './common/exceptions/business.exception';

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly appService: AppService,
   
  ) {}

  @Get('/getHello')
  @Version('1')
  getHello(): string {
    // const a: any = {}
    // console.log('请求了-----', a.b.c)
    // throw new BusinessException('业务通用错误，你的参数错了')
    console.log(this, '19-------')
    return this.appService.getHello();

    // 测试用内置方法获取环境变量
    // const port = this.configService.get('GITGUB_CONFIG');
    // console.log(port, '21-------')
  }
}
