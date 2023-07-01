import { FlightItemDTO } from 'src/flight/dtos/create-flights.dto';

export type FlightObject = {
  [key: string]: FlightItemDTO[];
};
