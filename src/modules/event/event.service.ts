import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventInput } from './dto/create-event.input';
import { Location } from '../location/location.entity';
import { User } from '../user/user.entity';
import { CreateEventObject } from './dto/create-event.object';
import { EditEventInput } from './dto/edit-event.input';
import { TokenParseUser } from '../user/dto/token-parse-user.object';
import { DeleteEventInput } from './dto/delete-event.input';


@Injectable()
export class EventService {
    constructor (
        @InjectRepository(Event) private eventRepository: Repository<Event>,
        @InjectRepository(Location) private locationRepository: Repository<Location>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async getMyEvents(user: TokenParseUser): Promise<Event[]> {
        const foundUser: User = await this.userRepository.findOneBy({
            id: user.id,
        })
        if (!foundUser) throw new ForbiddenException("User not found!");

        const events: Event[] = await this.eventRepository
            .createQueryBuilder("event")
            .andWhere("event.user.id = :userId", { userId: foundUser.id })
            .leftJoinAndSelect("event.user", "user")
            .leftJoinAndSelect("event.location", "location")
            .getMany();
            
        return events;
    }

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
        const foundUser: User = await this.userRepository.findOneBy({ id: user.id });
        
        const foundEvent: Event = await this.eventRepository
            .createQueryBuilder("event")
            .where("event.id = :id", { id: editEventInput.id })
            .andWhere("event.user.id = :userId", { userId: foundUser.id })
            .leftJoinAndSelect("event.user", "user")
            .leftJoinAndSelect("event.location", "location")
            .getOne();

        if (!foundUser) throw new NotFoundException("User is not found!");
        if (!foundEvent) throw new NotFoundException("Event is not found!");

        this.eventRepository.merge(foundEvent, editEventInput);

        const editedEvent: Event = await this.eventRepository.save(foundEvent);
        return editedEvent;
    }

    async deleteEvent(deleteEventInput: DeleteEventInput, user: TokenParseUser): Promise<Event> {
        const foundEvent: Event = await this.eventRepository
            .createQueryBuilder("event")
            .where("event.user = :id", { id: user.id })
            .leftJoinAndSelect("event.user", "user")
            .leftJoinAndSelect("event.location", "location")
            .getOne();

        const foundUser: User = await this.userRepository.findOneBy({ id: user.id });
        
        if (!foundUser) throw new NotFoundException("User is not found!");
        if (!foundEvent) throw new NotFoundException("Event is not found!");
        
        const deletedEvent: Event = (await this.eventRepository
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.user", "user")
            .delete()
            .from(Event)
            .where("event.id = :id", { id: deleteEventInput.id })
            .andWhere("user.id = :userId", { userId: user.id })
            .returning("*")
            .execute()).raw[0];

        return deletedEvent;
    }

    async fetchAll(): Promise<Event[]> {
        const events = this.eventRepository.find();
        return events;
    }
}