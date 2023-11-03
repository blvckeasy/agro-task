import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { CreateUserInput } from "./dto/create-user.input";
import { CreateUserResponse } from "./dto/user-response.dto";

@Resolver(of => User)
export class UserResolver {
    constructor (
        private userService: UserService,
    ) {}

    @Query(returns => [User])
    users (): Promise<User[]> {
        return this.userService.findAll()
    }

    @Mutation(returns => CreateUserResponse)
    createUser(
        @Args('createUserInput') createUserInput: CreateUserInput
    ): Promise<CreateUserResponse> {
        return this.userService.create(createUserInput);
    }
}
