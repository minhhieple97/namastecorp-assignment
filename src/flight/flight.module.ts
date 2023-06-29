import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './flight.entity';
import { FlightRequest } from './flight-request.entity';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { Request } from 'src/request/request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flight, FlightRequest, Request])],
  providers: [FlightService],
  controllers: [FlightController],
})
export class FlightModule {}
