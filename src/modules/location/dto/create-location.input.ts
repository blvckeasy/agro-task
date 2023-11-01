import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class CreateLocationInput {
    @Field(type => Float)
    x_coordinate: number;

    @Field(type => Float)
    y_coordinate: number;
}