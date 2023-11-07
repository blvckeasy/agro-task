import { Field, InputType } from "@nestjs/graphql";
import { Location } from "../../location/location.entity";
import { CreateLocationInput } from "src/modules/location/dto/create-location.input";
import { CreateUserInput } from "src/modules/user/dto/create-user.input";
import { UserResponse } from "src/modules/user/dto/user-response.dto";
import { CreateUserEventInput } from "./create-user-event.input";

@InputType()
export class CreateEventInput {

    @Field({ nullable: false })
    name: string;
    
    @Field(type => Date)
    startDate: Date;
    
    @Field(type => Date)
    endDate: Date;

    @Field(type => CreateLocationInput)
    location: CreateLocationInput
}