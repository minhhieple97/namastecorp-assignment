import {
  Controller,
  Post,
  Body,
  Ip,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Flight } from './flight.entity';
import { FlightService } from './flight.service';
import { FlightsData } from './dto/create-flights.dto';
import { FlightResponse } from './interfaces/flight.interface';
import { ValidateArrayPipe } from './pipes/itinerary-list.pipe';
import WrapData from 'src/common/interceptors/wrap-data-response.interceptors';
import { Request as RequestExpress } from 'express';
@Controller('flights')
@UseInterceptors(ClassSerializerInterceptor)
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post()
  @WrapData()
  async createRequestWithFlights(
    @Body(new ValidateArrayPipe()) flightsData: FlightsData,
    @Ip() ip: string,
    @Request() req: RequestExpress,
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
