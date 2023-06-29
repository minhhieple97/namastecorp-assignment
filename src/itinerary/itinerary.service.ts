import { Injectable } from '@nestjs/common';
import { Flight } from 'src/flight/flight.entity';

@Injectable()
export class ItineraryService {
  sortItinerary(itinerary: Flight[]) {
    const result = itinerary.map((flightFrom) => {
      const flightToIndex = itinerary.findIndex(
        (flight) => flight.from === flightFrom.to,
      );
      return [flightFrom, ...this.helperFunction(itinerary, flightToIndex)];
    });
    return result;
  }
  helperFunction(itinerary: Flight[], flightToIndex: number) {
    if (flightToIndex >= 0) {
      const flightTo = itinerary[flightToIndex];
      return [
        flightTo,
        ...this.helperFunction(
          itinerary,
          itinerary.findIndex((flight) => flight.from === flightTo.to),
        ),
      ];
    }
    return [];
  }
}
