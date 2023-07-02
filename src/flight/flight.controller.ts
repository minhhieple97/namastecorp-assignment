import {
  Controller,
  Post,
  Body,
  Ip,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightItemDTO, FlightsDTO } from './dtos/create-flights.dto';
import { ValidateArrayItineraryPipe } from './validations/itinerary-list.validation';
import WrapData from 'src/common/interceptors/wrap-data-response.interceptors';
@Controller('flights')
@UseInterceptors(ClassSerializerInterceptor)
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post()
  @WrapData()
  async createRequestWithFlights(
    @Body(new ValidateArrayItineraryPipe()) flightsData: FlightsDTO,
    @Ip() ip: string,
    @Request() req,
  ): Promise<FlightItemDTO[]> {
    const user = req.user;
    return this.flightService.createRequestWithFlights(ip, user, flightsData);
  }
}
