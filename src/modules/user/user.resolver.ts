import { Resolver, Query } from "@nestjs/graphql";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Resolver(of => User)
export class UserResolver {
    constructor (
        private userService: UserService,
    ) {}

    @Query(returns => [User])
    users (): Promise<User[]> {
        return this.userService.findAll()
    }
}
