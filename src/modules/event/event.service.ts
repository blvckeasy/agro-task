import { Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { Location } from '../location/location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventInput } from './dto/create-event.input';
import { Args, Mutation } from '@nestjs/graphql';

@Injectable()
export class EventService {
    constructor (
        @InjectRepository(Event) private eventRepository: Repository<Event>
    ) {}

    @Mutation(returns => Event)
    createEvent(@Args('createEventInput') createEventInput: CreateEventInput): Promise<Event> {
        const newEvent = this.eventRepository.create(createEventInput);
        return this.eventRepository.save(newEvent);
    }
    
    async fetchAll(): Promise<Event[]> {
        const events = this.eventRepository.find();
        return events;
    }
}