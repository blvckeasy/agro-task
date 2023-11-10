import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "src/config/configuration";


@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [UserService, UserResolver],
    exports: [UserService]
})
export class UserModule {} 