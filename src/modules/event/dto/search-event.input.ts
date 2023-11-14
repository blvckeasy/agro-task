import { Field, InputType } from "@nestjs/graphql";
import { SearchLocationInput } from "src/modules/location/dto/search-location.input";
import { SearchUserInput } from "src/modules/user/dto/search-user.input";


@InputType()
export class SearchEventInput {
    @Field({ nullable: true })
    startDate?: Date;
    
    @Field({ nullable: true })
    endDate?: Date;
    
    @Field({ nullable: true })
    user?: SearchUserInput;
    
    @Field({ nullable: true })
    location?: SearchLocationInput;
}