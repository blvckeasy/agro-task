import { Resolver, Query } from "@nestjs/graphql";
import { EventService } from "./event.service";
import { Event } from "./event.entity";
import { Args, Mutation, Context } from '@nestjs/graphql';
import { CreateEventInput } from './dto/create-event.input';
import { JwtService } from "@nestjs/jwt";
import { EditEventInput } from "./dto/edit-event.input";
import { DeleteEventInput } from "./dto/delete-event.input";
import { TokenParseUser } from "../user/dto/token-parse-user.object";


@Resolver(of => Event)
export class EventResolver {
    constructor (
        private eventService: EventService,
        private jwtService: JwtService,
    ) {}

    @Query(returns => [Event])
    getMyEvents (
        @Context() ctx: any,
    ): Promise<Event[]> {
        const { token }= ctx.req.headers;
        const user: TokenParseUser = this.jwtService.verify(token);
        return this.eventService.getMyEvents(user);
    }

    @Mutation(returns => Event)
    createEvent(
        @Args('createEventInput') createEventInput: CreateEventInput,
        @Context() ctx: any
    ): Promise<Event> {
        const { token } = ctx.req.headers;
        const user: TokenParseUser = this.jwtService.verify(token);
        const newEvent: Promise<Event> = this.eventService.createEvent(createEventInput, user);
        return newEvent;
    }

    @Mutation(returns => Event)
    editEvent (
        @Args('editEventInput') editEventInput: EditEventInput,
        @Context() ctx: any,
    ): Promise<Event> {
        const { token }= ctx.req.headers;
        const user: TokenParseUser = this.jwtService.verify(token);

        const editedEvent: Promise<Event> = this.eventService.editEvent(editEventInput, user);
        return editedEvent
    }

    @Mutation(returns => Event)
    deleteEvent (
        @Args('deleteEventInput') deleteEventInput: DeleteEventInput,
        @Context() ctx: any,
    ) {
        const { token }= ctx.req.headers;
        const user: TokenParseUser = this.jwtService.verify(token);

        return this.eventService.deleteEvent(deleteEventInput, user);
    }
}   