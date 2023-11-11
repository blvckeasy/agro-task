import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RegisterResponseObject {
    @Field()
    id: number;

    @Field()
    username: string;

    @Field()
    token?: string;
}