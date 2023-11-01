import { Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventInput } from './dto/create-event.input';
import { Location } from '../location/location.entity';


@Injectable()
export class EventService {
    constructor (
        @InjectRepository(Event) private eventRepository: Repository<Event>,
        @InjectRepository(Location) private locationRepository: Repository<Location>,
    ) {}

    async createEvent(createEventInput: CreateEventInput): Promise<Event> {
        const newLocation = this.locationRepository.create(createEventInput.location);
        const data = await this.locationRepository.save(newLocation);

        createEventInput.location = data;
        
        const newEvent = this.eventRepository.create(createEventInput);
        return await this.eventRepository.save(newEvent);
    }
    
    async fetchAll(): Promise<Event[]> {
        const events = this.eventRepository.find();
        return events;
    }
}


