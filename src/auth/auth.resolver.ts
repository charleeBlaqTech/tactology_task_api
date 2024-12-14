import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";


@Resolver()
export class AuthResolver {
    constructor(private readonly authentication: AuthService) { }

    @Mutation(() => String)
    async loginUser(
        @Arg("username") username: string, 
        @Arg("password") password: string): Promise<string> {
        return await this.authentication.signIn(username, password)
    }

}