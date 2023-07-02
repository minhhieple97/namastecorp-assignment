import { FlightItemDTO } from 'src/flight/dtos/create-flights.dto';
import { User } from 'src/user/user.entity';

export type FlightObject = {
  [key: string]: FlightItemDTO[];
};

export type JobDataItinerary = {
  ip: string;
  user: User;
  sortedItinerary: FlightItemDTO[];
};
