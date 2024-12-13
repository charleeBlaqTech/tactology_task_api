import { IsString, IsArray, ArrayMinSize, MinLength, IsOptional } from 'class-validator';
import { CreateSubDepartmentDto } from './create-subdepartment.dto';

export class CreateDepartmentDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  subDepartments: CreateSubDepartmentDto[];
}