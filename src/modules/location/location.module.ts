import { Module } from '@nestjs/common';
import { LocationService } from './location.service';

@Module({
  providers: [LocationService]
})
export class LocationModule {}
