import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class SearchUserInput {
    @Field(type => Int, { nullable: true })
    id?: number;

    @Field({ nullable: true })
    username?: string; 
}