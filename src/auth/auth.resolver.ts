import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { TokenResponseType } from "./auth.response.type";


@Resolver()
export class AuthResolver {
    constructor(private readonly authentication: AuthService) { }

    @Mutation(() => TokenResponseType)
    async loginUser(
        @Arg("username") username: string, 
        @Arg("password") password: string): Promise<TokenResponseType> {
        return await this.authentication.signIn(username, password)
    }

}