import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator"

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: '涩Q' })
  username: string;

  @ApiProperty({ example: 'hello' })
  enName?: string;

  @IsNotEmpty()
  @ApiProperty({ example: '' })
  email: string;

  @ApiProperty({ example: '' })
  avatar?: string;

  @ApiProperty({ example: '' })
  mobile?: string;


//   @ApiProperty({ example: '' })
//   departmentName?: string;

  @ApiProperty({ example: 0 })
  departmentId?: number;
}

export class GithubUserInfo {
  accessToken?: string;
  email?: string;
  avatarUrl?: string;
  avatar_url?: string;
  avatarThumb?: string;
  avatarBig?: string;
  avatarMiddle?: string;
  mobile?: string;
  enName?: string;
  name?: string;
}