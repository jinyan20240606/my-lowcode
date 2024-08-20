import { PartialType } from '@nestjs/swagger';
import { CreateDepartmentDto } from './create-department.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator"

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {
    @IsNotEmpty()
    @ApiProperty({example: 2})
    id: Number;
}
