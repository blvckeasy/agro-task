import { Field, ObjectType } from "@nestjs/graphql";
import { Location } from "src/modules/location/location.entity";
import { User } from "src/modules/user/user.entity";
import { ManyToOne } from "typeorm";


@ObjectType()
export class CreateEventObject {
    @Field({ nullable: false })
    name: string;

    @Field(type => Date)
    startDate: Date;
    
    @Field(type => Date)
    endDate: Date;
    
    @ManyToOne(() => Location, (user) => user.events)
    @Field(type => User)
    user: User;

    @ManyToOne(() => Location, (location) => location.events)
    @Field(type => Location)
    location: Location;
}