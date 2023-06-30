import { FlightData } from 'src/flight/dto/create-flights.dto';
import { Flight } from 'src/flight/flight.entity';

export type FlightObject = {
  [key: string]: FlightData[];
};
