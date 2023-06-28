import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './flight.entity';
import { FlightData, FlightsData } from './dto/create-flights.dto';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
  ) {}

  async createFlights(
    userId: number,
    flightsData: FlightsData,
  ): Promise<Flight[]> {
    // const user = await this.userRepository.findOne({
    //   where: { id: userId },
    // });
    const flights = flightsData.flights.map((flightData) => {
      const flight = new Flight();
      flight.from = flightData.from;
      flight.to = flightData.to;
      // flight.user = user;
      return flight;
    });

    return this.flightRepository.save(flights);
  }
}
