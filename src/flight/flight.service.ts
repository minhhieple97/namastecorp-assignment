import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from './flight.entity';
import { FlightData, FlightsData } from './dto/create-flights.dto';
import { Request } from 'src/request/request.entity';
import { FlightRequest } from './flight-request.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
    @InjectRepository(FlightRequest)
    private readonly flightRequestRepository: Repository<FlightRequest>,
    private connection: DataSource,
  ) {}

  async createRequestWithFlights(
    ip: string,
    user: User,
    flightsData: FlightsData,
  ): Promise<Flight[]> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const request = await queryRunner.manager.save(Request, {
        ip,
        user,
      });
      const flights = flightsData.flights.map((flightData) => {
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
      await queryRunner.manager.save(FlightRequest, flightsRequest);
      await queryRunner.commitTransaction();
      return flightsRecord;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    }
  }

  sortItinerary(itinerary: Flight[]) {
    const result = itinerary.map((flightFrom) => {
      const flightToIndex = itinerary.findIndex(
        (flight) => flight.from === flightFrom.to,
      );
      return [flightFrom, ...this.helperFunction(itinerary, flightToIndex)];
    });
    return result;
  }

  helperFunction(itinerary: Flight[], flightToIndex: number) {
    if (flightToIndex >= 0) {
      const flightTo = itinerary[flightToIndex];
      return [
        flightTo,
        ...this.helperFunction(
          itinerary,
          itinerary.findIndex((flight) => flight.from === flightTo.to),
        ),
      ];
    }
    return [];
  }
}
