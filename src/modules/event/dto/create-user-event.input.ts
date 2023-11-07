import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateUserEventInput {
    @Field(type => Int)
    userId: number;
}