import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventInput } from './dto/create-event.input';
import { Location } from '../location/location.entity';
import { User } from '../user/user.entity';
import { CreateEventObject } from './dto/create-event.object';
import { EditEventInput } from './dto/edit-event.input';
import { TokenParseUser } from '../user/dto/token-parse-user.object';
import { UserService } from '../user/user.service';


@Injectable()
export class EventService {
    constructor (
        @InjectRepository(Event) private eventRepository: Repository<Event>,
        @InjectRepository(Location) private locationRepository: Repository<Location>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async createEvent(createEventInput: CreateEventInput, user: TokenParseUser): Promise<Event> {
        const newLocation: Location = this.locationRepository.create(createEventInput.location);
        const insertLocation: Location = await this.locationRepository.save(newLocation);
        const foundUser: User = await this.userRepository.findOneBy({ id: user.id });

        if (!foundUser) throw new UnauthorizedException("User not found!");

        const createEvent: CreateEventObject = {
            ...createEventInput,
            user: foundUser,
            location: insertLocation 
        }
        const newEvent: Event = this.eventRepository.create(createEvent);
        const insertEvent: Event = await this.eventRepository.save(newEvent);

        return insertEvent;
    }
    
    async editEvent(editEventInput: EditEventInput, user: TokenParseUser): Promise<Event> {        
        const foundEvent: Event = await this.eventRepository
            .createQueryBuilder("event")
            .where("event.id = :id", { id: editEventInput.id })
            .leftJoinAndSelect("event.user", "user")
            .leftJoinAndSelect("event.location", "location")
            .getOne();

        if (!foundEvent) throw new NotFoundException("Event is not found!");
        this.eventRepository.merge(foundEvent, editEventInput);

        const editedEvent: Event = await this.eventRepository.save(foundEvent);
        return editedEvent;
    }

    async fetchAll(): Promise<Event[]> {
        const events = this.eventRepository.find();
        return events;
    }
}