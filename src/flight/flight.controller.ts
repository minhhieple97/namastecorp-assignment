import { Controller, Post, Body } from '@nestjs/common';
import { Flight } from './flight.entity';
import { FlightService } from './flight.service';
import { FlightsData } from './dto/create-flights.dto';

@Controller('flights')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post()
  async createFlights(@Body() flightsData: FlightsData): Promise<Flight[]> {
    const flight = await this.flightService.createFlights(1, flightsData);
    return flight;
  }
}
