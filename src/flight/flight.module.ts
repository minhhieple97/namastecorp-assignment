import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './flight.entity';
import { FlightRequest } from './flight-request.entity';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Flight, FlightRequest])],
  providers: [FlightService],
  controllers: [FlightController],
})
export class FlightModule {}
