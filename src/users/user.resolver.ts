import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { User } from "./users.entity";
import { UserType } from "./user.type";
import { UsersService } from "./users.service";


@Resolver()
export class UserResolver {
    constructor(private readonly userService: UsersService) { }

    @Mutation(() => UserType)
    async createUser(
        @Arg("fistName") firstName: string, 
        @Arg("lastName") lastName: string, 
        @Arg("email") email: string, 
        @Arg("username") username: string, 
        @Arg("password") password: string): Promise<User> {
        return await this.userService.create({lastName, firstName, username, email, password})
    }

    @Query(() => [UserType])
    async fetchUsers(): Promise<User[]> {
        return await this.userService.find()
    }

    @Query(() => UserType)
    async findUser(@Arg("username") username: string,): Promise<User> {
        return await this.userService.findUser(username)
    }

}