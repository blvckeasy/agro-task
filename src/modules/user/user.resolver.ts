import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { CreateUserInput } from "./dto/create-user.input";
import { UserResponse } from "./dto/user-response.dto";
import { LoginUserInput } from "./dto/login-user.input";
import { BadGatewayException, ContextType, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginResponseInterface } from "./interface/login-response.interface";
import { LoginResponseObject } from "./dto/login-response.object";
import { RegisterResponseObject } from "./dto/register-response.object";
import { RegisterResponseInterface } from "./interface/register-response.interface";


@Resolver(of => User)
export class UserResolver {
    constructor (
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    @Query(returns => [UserResponse])
    users (): Promise<UserResponse[]> {
        return this.userService.findAll();
    }

    @Query(returns => [UserResponse])
    async test (
        @Context() context: any,
    ): Promise<UserResponse[]> {
        const { token } = context.req.headers;

        if (!token) throw new NotFoundException("Token is require!");

        const user = await this.jwtService.verifyAsync(token);
        const ctxUserAgent = context.req.headers['user-agent'];

        if (user.userAgent !== ctxUserAgent) throw new BadGatewayException("Invalid Token");
        return this.userService.findAll();
    }

    @Mutation(returns => RegisterResponseObject)
    register (
        @Args('createUserInput') createUserInput: CreateUserInput,
        @Context() context: any,
    ): Promise<RegisterResponseInterface> {
        return this.userService.register(createUserInput, context);
    }

    @Mutation(returns => LoginResponseObject)
    login (
        @Args("loginUserInput") loginUserInput: LoginUserInput,
        @Context() context: any,
    ): Promise<LoginResponseInterface> {
        return this.userService.login(loginUserInput, context);
    }
}