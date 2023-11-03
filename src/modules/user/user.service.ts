import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserInput } from "./dto/create-user.input";
import { CreateUserResponse } from "./dto/user-response.dto";

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}
    
    async findAll (): Promise<User[]> {
        const users = this.userRepository.find();
        return users;
    }

    async create (createUserInput: CreateUserInput): Promise<CreateUserResponse> {
        const newUser = this.userRepository.create(createUserInput);
        const insertedUser = <CreateUserResponse>(await this.userRepository.save(newUser));
        
        insertedUser.token = "salom"
        return insertedUser
    }
}