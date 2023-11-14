import { SearchLocationInput } from "src/modules/location/dto/search-location.input";
import { SearchUserInterface } from "src/modules/user/interface/search-user.interface";


export class SearchEventInterface {
    id?: number;
    startDate?: Date;
    endDate?: Date;
    user?: SearchUserInterface;
    location?: SearchLocationInput;
}