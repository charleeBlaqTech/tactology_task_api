
import { Field, ObjectType, InputType, Int} from "type-graphql";
import { IsString, IsNotEmpty, MinLength, IsArray, ValidateNested} from 'class-validator';

@ObjectType()
export class SubDepartmentType{
    @Field(()=> Int)
    id: number

    @Field()
    @IsString()
    @MinLength(2, {message: "Sub-department name must be at least two characters long."})
    name: string
}

@ObjectType()
export class DepartmentType{
    @Field()
    @IsString()
    @MinLength(2, {message: "Department name must be at least two characters long."})
    name: string

    @Field(()=>[SubDepartmentType])
    subDepartments : SubDepartmentType[]
}

@InputType()
export class SubDepartmentInput{
    @Field()
    @IsString()
    @MinLength(2, {message: "Sub-department name must be at least two characters long."})
    name: string
}
