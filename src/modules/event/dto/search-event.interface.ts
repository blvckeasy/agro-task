import { Location } from "src/modules/location/location.entity";
import { SearchUserInterface } from "src/modules/user/interface/search-user.interface";
import { User } from "src/modules/user/user.entity";

export class SearchEventInterface {
    id?: number;
    username?: string;
    startDate?: Date;
    endDate?: Date;
    user?: SearchUserInterface;
    location?: Location;
}