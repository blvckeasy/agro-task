import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Location } from '../location/location.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Location, User])],
  providers: [EventService, EventResolver]
})
export class EventModule {}