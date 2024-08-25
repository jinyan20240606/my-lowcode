import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ApiTags} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private readonly configService: ConfigService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Param() pa) {
    // 测试用内置方法获取环境变量
    // const port = this.configService.get('GITGUB_CONFIG');
    // console.log(port, '21-------')
    console.log('获取所有用户', pa)
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('notone/:id')
  findNotOne(@Param('id') id: string) {
    return this.userService.findNotOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log(id, updateUserDto, '@Patch(“:id”)请求参数-------')
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
