import { ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserInput } from "./dto/create-user.input";
import { CreateUserResponse } from "./dto/user-response.dto";
import { JwtService } from "@nestjs/jwt";
import { convertTypes } from "src/utils/convertTypes";

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}
    
    async findAll (): Promise<User[]> {
        const users = this.userRepository.find();
        return users;
    }

    async create (createUserInput: CreateUserInput): Promise<CreateUserResponse> {
        const foundUser = await this.userRepository.findOne({
            where: {
                username: createUserInput.username
            }
        });

        if (foundUser) throw new ForbiddenException("user already have!"); 

        const newUser = this.userRepository.create(createUserInput);
        const insertedUser = <CreateUserResponse>(await this.userRepository.save(newUser));

        insertedUser.token = await this.jwtService.signAsync(convertTypes.classToPlainObject(insertedUser));
        return insertedUser
    }
}