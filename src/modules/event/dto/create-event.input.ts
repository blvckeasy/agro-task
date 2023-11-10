import { Field, InputType } from "@nestjs/graphql";
import { CreateLocationInput } from "src/modules/location/dto/create-location.input";


@InputType()
export class CreateEventInput {

    @Field({ nullable: false })
    title: string;
    
    @Field()
    description?: string;

    @Field(type => Date)
    startDate: Date;
    
    @Field(type => Date, { nullable: false })
    endDate: Date;

    @Field(type => CreateLocationInput, { nullable: false })
    location: CreateLocationInput
}