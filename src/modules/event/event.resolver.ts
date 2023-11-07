// event.resolver.ts

import { Resolver, Query } from "@nestjs/graphql";
import { EventService } from "./event.service";
import { Event } from "./event.entity";
import { Args, Mutation, Context } from '@nestjs/graphql';
import { CreateEventInput } from './dto/create-event.input';
import { JwtService } from "@nestjs/jwt";

@Resolver(of => Event)
export class EventResolver {
    constructor (
        private eventService: EventService,
        private jwtService: JwtService,
    ) {}

    @Mutation(returns => Event)
    createEvent(
        @Args('createEventInput') createEventInput: CreateEventInput,
        @Context() ctx: any
    ): Promise<Event> {
        const { token } = ctx.req.headers;

        const user = this.jwtService.verify(token);
        
        return this.eventService.createEvent(createEventInput, user);
    }

    @Query(returns => [Event])
    events(): Promise<Event[]> {
        return this.eventService.fetchAll();
    }
}