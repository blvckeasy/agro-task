import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserResponse {
    @Field()
    id: number;

    @Field({ nullable: false })
    username: string;

    @Field({ nullable: false })
    token?: string;
}