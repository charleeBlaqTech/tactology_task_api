import { IsString, MinLength } from 'class-validator';

export class CreateSubDepartmentDto {
  @IsString()
  @MinLength(2)
  name: string;
}