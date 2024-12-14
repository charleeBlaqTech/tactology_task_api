import { Field, ObjectType, InputType, Int} from "type-graphql";
import { IsString, IsNotEmpty, MinLength,IsEmail, IsArray, ValidateNested} from 'class-validator';

@ObjectType()
export class UserType{
    @Field()
    @IsString()
    firstName: string

    @Field()
    @IsString()
    lastName: string

    @Field()
    @IsEmail()
    email: string

    @Field()
    @IsString()
    username: string

    @Field()
    @IsString()
    password: string
}

