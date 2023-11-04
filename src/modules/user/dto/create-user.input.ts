import { InputType, Field } from "@nestjs/graphql";
import { IsString, Length, Matches } from "class-validator";

@InputType()
export class CreateUserInput {
    @IsString({
        message: "username must be string"
    })
    @Field({ nullable: false })
    username: string;

    @IsString({
        message: "message must be string"
    })
    @Field({ nullable: false })
    password: string;

}