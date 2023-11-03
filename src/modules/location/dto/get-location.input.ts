import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetLocationInput {
    @Field({ nullable: false })
    id: number;
}