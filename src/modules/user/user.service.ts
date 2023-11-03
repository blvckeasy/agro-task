import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}
    
    async findAll (): Promise<User[]> {
        const users = this.userRepository.find();
        return users;
    }
}