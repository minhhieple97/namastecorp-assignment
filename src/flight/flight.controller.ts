import { Controller, Post, Body, Ip, Request } from '@nestjs/common';
import { Flight } from './flight.entity';
import { FlightService } from './flight.service';
import { FlightsData } from './dto/create-flights.dto';
import { FlightResponse } from './interfaces/flight.interface';

@Controller('flights')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post()
  async createRequestWithFlights(
    @Body() flightsData: FlightsData,
    @Ip() ip: string,
    @Request() req,
  ): Promise<FlightResponse[]> {
    const user = req.user;
    const flight = await this.flightService.createRequestWithFlights(
      ip,
      user,
      flightsData,
    );
    return flight;
  }
}
