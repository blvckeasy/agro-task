import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class DeleteEventInput {
    @Field(type => Int, { nullable: false })
    id: number
}