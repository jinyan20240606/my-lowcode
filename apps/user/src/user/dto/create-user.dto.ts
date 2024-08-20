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
