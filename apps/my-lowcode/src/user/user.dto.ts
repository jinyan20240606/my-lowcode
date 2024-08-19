import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class AddUserDto {
  @ApiProperty({ example: 123, })
  id?: string;

  @ApiProperty({ example: 'cookie' })
  @IsNotEmpty({message: '名字不能为空'})
  name: string;

  @ApiProperty({ example: 'cookieboty@qq.com' })
  @IsNotEmpty({message: '邮箱不能为空'})
  email: string;

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  username: string;
}
