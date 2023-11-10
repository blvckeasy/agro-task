import { Field, ObjectType } from "@nestjs/graphql";
import { Location } from "src/modules/location/location.entity";
import { User } from "src/modules/user/user.entity";


@ObjectType()
export class CreateEventObject {
    @Field({ nullable: false })
    title: string;

    @Field()
    description?: string;

    @Field(type => Date)
    startDate: Date;
    
    @Field(type => Date)
    endDate: Date;
    
    @Field(type => User)
    user: User;

    @Field(type => Location)
    location: Location;
}