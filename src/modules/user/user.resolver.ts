import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { CreateUserInput } from "./dto/create-user.input";
import { UserResponse } from "./dto/user-response.dto";
import { LoginUserInput } from "./dto/login-user.input";

@Resolver(of => User)
export class UserResolver {
    constructor (
        private userService: UserService,
    ) {}

    @Query(returns => [User])
    users (): Promise<User[]> {
        return this.userService.findAll()
    }

    @Mutation(returns => UserResponse)
    register (
        @Args('createUserInput') createUserInput: CreateUserInput
    ): Promise<UserResponse> {
        return this.userService.register(createUserInput);
    }

    @Mutation(returns => UserResponse)
    login (
        @Args("loginUserInput") loginUserInput: LoginUserInput
    ): Promise<UserResponse> {
        return this.userService.login(loginUserInput)
    }
}
