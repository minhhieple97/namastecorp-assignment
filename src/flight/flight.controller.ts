import { Controller, Post, Body, UseGuards, Ip, Request } from '@nestjs/common';
import { Flight } from './flight.entity';
import { FlightService } from './flight.service';
import { FlightsData } from './dto/create-flights.dto';

@Controller('flights')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post()
  async createRequestWithFlights(
    @Body() flightsData: FlightsData,
    @Ip() ip: string,
    @Request() req,
  ): Promise<Flight[]> {
    const user = req.user;
    const flight = await this.flightService.createRequestWithFlights(
      ip,
      user,
      flightsData,
    );
    return flight;
  }
}
