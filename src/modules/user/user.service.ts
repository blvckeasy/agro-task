import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserInput } from "./dto/create-user.input";
import { UserResponse } from "./dto/user-response.dto";
import { JwtService } from "@nestjs/jwt";
import { convertTypes } from "src/utils/convertTypes";
import { LoginUserInput } from "./dto/login-user.input";
import { UserResponseInterface } from './interface/user-response.interface'
import { SearchUserInterface } from "./dto/search-user.interface";

export type UserResponseType = {
    id: number;
    username: string;
    token?: string;
}

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}
    
    async findAll (): Promise<User[]> {
        const users: Promise<User[]> = this.userRepository.find();
        return users;
    }

    async findOne(params: SearchUserInterface): Promise<User> {
        const foundUser: Promise<User> = this.userRepository.findOneBy(params);
        return foundUser;
    }

    async register (createUserInput: CreateUserInput, context: any): Promise<UserResponse> {
        const foundUser = await this.userRepository.findOne({
            where: {
                username: createUserInput.username
            }
        });

        if (foundUser) throw new ForbiddenException("user already have!"); 

        const userAgent = context.req.headers["user-agent"];
        const newUser = this.userRepository.create(createUserInput);
        const insertedUser = await this.userRepository.save(newUser);

        const modifiedUser: UserResponseInterface = <UserResponseInterface>convertTypes.classToPlainObject(insertedUser);

        modifiedUser.token = await this.jwtService.signAsync(convertTypes.classToPlainObject({ ...modifiedUser, userAgent }));
        return modifiedUser
    }

    async login(loginUserInput: LoginUserInput, context: any): Promise<UserResponse> {
        const { username, password } = loginUserInput;
        const foundUser = await this.userRepository.findOne({
            where: {
                username, password
            }
        })
    
        if (!foundUser) throw new UnauthorizedException()
        const userAgent = context.req.headers["user-agent"];
    
        delete foundUser.password
        const modifiedUser: UserResponseInterface = <UserResponseInterface>convertTypes.classToPlainObject(foundUser);
        
        modifiedUser.token = await this.jwtService.signAsync(convertTypes.classToPlainObject({ ...modifiedUser, userAgent}));   
        return modifiedUser
    }
}