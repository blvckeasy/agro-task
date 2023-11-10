import { Field, InputType, Int } from "@nestjs/graphql";
import { CreateLocationInput } from "src/modules/location/dto/create-location.input";


@InputType()
export class EditEventInput {
    @Field(type => Int, {
        nullable: false
    })
    id: number;

    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    startDate?: Date

    @Field({ nullable: true })
    endDate?: Date

    @Field(type => CreateLocationInput, { nullable: true })
    location?: CreateLocationInput;
}