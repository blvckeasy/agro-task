import { Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventInput } from './dto/create-event.input';
import { Location } from '../location/location.entity';
import { User } from '../user/user.entity';
import { CreateEventObject } from './dto/create-event.object';


@Injectable()
export class EventService {
    constructor (
        @InjectRepository(Event) private eventRepository: Repository<Event>,
        @InjectRepository(Location) private locationRepository: Repository<Location>,
    ) {}

    async createEvent(createEventInput: CreateEventInput, user: User): Promise<Event> {
        const newLocation: Location = this.locationRepository.create(createEventInput.location);
        const insertLocation: Location = await this.locationRepository.save(newLocation);
        const createEvent: CreateEventObject = {
            ...createEventInput,
            user,
            location: insertLocation 
        }
        const newEvent: Event = this.eventRepository.create(createEvent);
        const insertEvent: Event = await this.eventRepository.save(newEvent);
        return insertEvent
    }
    
    async fetchAll(): Promise<Event[]> {
        const events = this.eventRepository.find();
        return events;
    }
}


