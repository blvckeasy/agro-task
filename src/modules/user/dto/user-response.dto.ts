import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CreateUserResponse {
    @Field()
    id: number;

    @Field({ nullable: false })
    username: string;

    @Field({ nullable: false })
    token?: string;
}