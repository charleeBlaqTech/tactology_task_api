
import { Field, ObjectType, InputType, Int} from "type-graphql";
import { IsString, IsNotEmpty, MinLength,IsEmail, IsArray, ValidateNested} from 'class-validator';

@ObjectType()
export class TokenResponseType{
    @Field()
    @IsString()
    token: string
}



