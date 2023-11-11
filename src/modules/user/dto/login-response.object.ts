import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginResponseObject {
    @Field()
    id: number;

    @Field()
    username: string;

    @Field()
    token?: string;
}