import { Field, InputType } from "@nestjs/graphql";
import { IsString, Length, Matches } from "class-validator";

@InputType()
export class LoginUserInput {
    @IsString({
        message: "username must be string"
    })
    @Length(5, 32, {
        message: "username length must be [5, 32] symbol"
    })
    @Matches(/^[a-zA-Z_][a-zA-Z0-9_]*$/g, {
        message: "username entered incorrectly"
    })
    @Field()
    username: string;

    @IsString({
        message: "message must be string"
    })
    @Length(6, 15, {
        message: "password must string length [6, 15]"
    })
    @Field()
    password: string;
}