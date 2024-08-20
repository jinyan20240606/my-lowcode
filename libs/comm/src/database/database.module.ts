import { Global, Module } from '@nestjs/common';
import { DatabaseProviders } from './database.providers';

// 全局装饰器：主模块使用这个，其他所有子模块都能自动引用到
@Global()
@Module({
  providers: [...DatabaseProviders],
  exports: [...DatabaseProviders],
})

export class DatabaseModule { }
