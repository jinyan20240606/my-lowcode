import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator"

export class CreateDepartmentDto {
    @IsNotEmpty()
    @ApiProperty({ example: '人力资源部' })
    name: string;
}
