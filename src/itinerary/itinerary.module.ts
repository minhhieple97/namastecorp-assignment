import { Module } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';

@Module({
  providers: [ItineraryService],
  exports: [ItineraryService],
})
export class ItineraryModule {}
