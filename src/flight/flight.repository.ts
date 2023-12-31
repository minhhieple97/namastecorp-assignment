import { DataSource, Repository } from 'typeorm';
import { Flight } from './flight.entity';
import { Injectable } from '@nestjs/common';
import { FlightRequest } from './flight-request.entity';
import { Request } from 'src/request/request.entity';
import { JobDataItinerary } from 'src/itinerary/interfaces/itinerary.interface';

@Injectable()
export class FlightRepository extends Repository<Flight> {
  constructor(private connection: DataSource) {
    super(Flight, connection.createEntityManager());
  }

  async createRequestWithFlights(data: JobDataItinerary): Promise<void> {
    const { ip, user, sortedItinerary } = data;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const request = new Request();
      request.ip = ip;
      request.user = user;
      await queryRunner.manager.save(Request, request);
      const flights = sortedItinerary.map((flightData) => {
        const flight = new Flight();
        flight.from = flightData.from;
        flight.to = flightData.to;
        flight.user = user;
        return flight;
      });
      const flightsRecord = await queryRunner.manager.save(Flight, flights);
      const flightsRequest = flightsRecord.map((flightRecord) => {
        const flightRequest = new FlightRequest();
        flightRequest.flight = flightRecord;
        flightRequest.request = request;
        return flightRequest;
      });
      await queryRunner.manager.insert(FlightRequest, flightsRequest);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
