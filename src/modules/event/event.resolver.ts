import { Resolver, Query } from "@nestjs/graphql";
import { EventService } from "./event.service";
import { Event } from "./event.entity";

@Resolver()
export class EventResolver {
    constructor (
        private eventService: EventService
    ) {}

    @Query(returns => [Event])
    events(): Promise<Event[]> {
        return this.eventService.fetchAll();
    }
}