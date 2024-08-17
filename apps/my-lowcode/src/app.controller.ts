import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';
// import { BusinessException } from './common/exceptions/business.exception';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Version('1')
  getHello(): string {
    // const a: any = {}
    // console.log('请求了-----', a.b.c)
    // throw new BusinessException('业务通用错误，你的参数错了')
    return this.appService.getHello();
  }
}
