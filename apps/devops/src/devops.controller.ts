import { Controller, Get, Version } from '@nestjs/common';
import { DevopsService } from './devops.service';

@Controller()
export class DevopsController {
  constructor(private readonly devopsService: DevopsService) {}

  @Get()
  @Version('1')
  getHello(): string {
    return this.devopsService.getHello();
  }
}
