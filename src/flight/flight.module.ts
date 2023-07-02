import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './flight.entity';
import { FlightRequest } from './flight-request.entity';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { Request } from 'src/request/request.entity';
import { FlightRepository } from './flight.repository';
import { ItineraryService } from 'src/itinerary/itinerary.service';
import { IitineraryQueue } from 'src/queues/itinerary.queue';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME } from 'src/common/config/constants';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from '@bull-board/api/bullAdapter';
@Module({
  imports: [
    TypeOrmModule.forFeature([Flight, FlightRequest, Request]),
    BullModule.registerQueue({
      name: QUEUE_NAME.ITINERARY,
      limiter: {
        max: 5,
        duration: 2000,
      },
    }),
    BullBoardModule.forFeature({
      name: QUEUE_NAME.ITINERARY,
      adapter: BullAdapter,
    }),
  ],
  providers: [
    FlightService,
    FlightRepository,
    ItineraryService,
    IitineraryQueue,
  ],
  controllers: [FlightController],
})
export class FlightModule {}
