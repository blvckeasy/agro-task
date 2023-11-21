import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Location } from '../location/location.entity';
import { User } from '../user/user.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Location, User])],
  providers: [EventService, EventResolver, ConfigService]
})
export class EventModule {}