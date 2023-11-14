import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class SearchLocationInput {
    @Field(type => Float, { nullable: true })
    id?: number;

    @Field(type => Float, { nullable: true })
    x_coordinate?: number;

    @Field(type => Float, { nullable: true })
    y_coordinate?: number;
}