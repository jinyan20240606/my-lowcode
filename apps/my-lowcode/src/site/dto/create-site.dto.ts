import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { API_TYPE, PAGE_TYPE } from '../entities/site.mongo.entity';

export class CreateSiteDto {
  @ApiProperty({ example: '', description: '站点id' })
  id?: string;

  @ApiProperty({
    example: 'http://localhost:3000/api/doc-json',
    description: '解析URL',
  })
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    example: API_TYPE.swagger,
    enum: API_TYPE,
    description: '解析接口来源',
  })
  @IsNotEmpty()
  apiType: string;

  @ApiProperty({ example: '搭建服务', description: '站点名称' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '搭建服务描述', description: '站点描述' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: PAGE_TYPE.pc,
    enum: PAGE_TYPE,
    description: '站点类型',
  })
  @IsNotEmpty()
  type: PAGE_TYPE;
}
