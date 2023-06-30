import { Flight } from 'src/flight/flight.entity';

export type FlightObject = {
  [key: string]: Flight[];
};
