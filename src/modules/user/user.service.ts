import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserInput } from "./dto/create-user.input";
import { UserResponse } from "./dto/user-response.dto";
import { JwtService } from "@nestjs/jwt";
import { convertTypes } from "src/utils/convertTypes";
import { LoginUserInput } from "./dto/login-user.input";

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}
    
    async findAll (): Promise<UserResponse[]> {
        const users = this.userRepository.find();
        return users;
    }

    async register (createUserInput: CreateUserInput): Promise<UserResponse> {
        const foundUser = await this.userRepository.findOne({
            where: {
                username: createUserInput.username
            }
        });

        if (foundUser) throw new ForbiddenException("user already have!"); 

        const newUser = this.userRepository.create(createUserInput);
        const insertedUser = <UserResponse>(await this.userRepository.save(newUser));

        insertedUser.token = await this.jwtService.signAsync(convertTypes.classToPlainObject(insertedUser));
        return insertedUser
    }

    async login(loginUserInput: LoginUserInput): Promise<UserResponse> {
        const { username, password } = loginUserInput;
        const foundUser = (await this.userRepository.findOne({
            where: {
                username, password
            }
        })) as UserResponse


        if (!foundUser) throw new UnauthorizedException()

        foundUser.token = await this.jwtService.signAsync(convertTypes.classToPlainObject(foundUser));    

        return foundUser
    }
}