import { Injectable } from '@nestjs/common';
import { FlightItemDTO, FlightsDTO } from './dtos/create-flights.dto';
import { User } from 'src/user/user.entity';
import { ItineraryService } from '../itinerary/itinerary.service';
import { InjectQueue } from '@nestjs/bull';
import { JOB_NAME, QUEUE_NAME } from '../common/config/constants';
import { Queue } from 'bull';
@Injectable()
export class FlightService {
  constructor(
    private readonly itineraryService: ItineraryService,
    @InjectQueue(QUEUE_NAME.ITINERARY)
    private itineraryQueue: Queue,
  ) {}

  async createRequestWithFlights(
    ip: string,
    user: User,
    flightsData: FlightsDTO,
  ): Promise<FlightItemDTO[]> {
    const sortedItinerary = await this.getSortedItineraryV2(
      flightsData.flights,
    );
    await this.itineraryQueue.add(JOB_NAME.INSERT_ITINERARY, {
      ip,
      user,
      sortedItinerary,
    });
    return sortedItinerary;
  }

  async getSortedItineraryV2(
    flightsData: FlightItemDTO[],
  ): Promise<FlightItemDTO[]> {
    return new Promise((resolve) =>
      setTimeout(() => {
        const result = this.itineraryService.sortItinerary(flightsData);
        resolve(result);
      }, 0),
    );
  }
}
