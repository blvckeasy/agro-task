import { Resolver, Query } from "@nestjs/graphql";
import { EventService } from "./event.service";
import { Event } from "./event.entity";
import { Args, Mutation } from '@nestjs/graphql';
import { CreateEventInput } from './dto/create-event.input';

@Resolver()
export class EventResolver {
    constructor (
        private eventService: EventService
    ) {}

    @Mutation(returns => Event)
    createEvent(@Args('createEventInput') createEventInput: CreateEventInput): Promise<Event> {
        return this.eventService.createEvent(createEventInput);
    }

    @Query(returns => [Event])
    events(): Promise<Event[]> {
        return this.eventService.fetchAll();
    }
}