import { Injectable } from '@nestjs/common';
import { FlightObject } from './interfaces/itinerary.interface';
import { FlightItemDTO } from 'src/flight/dtos/create-flights.dto';

@Injectable()
export class ItineraryService {
  sortItinerary(itinerary: FlightItemDTO[]) {
    const memo: FlightObject = {};
    for (const flight of itinerary) {
      const arr = this.findDestination(itinerary, flight, memo);
      if (arr.length === itinerary.length) return arr;
    }
    return [];
  }
  findDestination(
    itinerary: FlightItemDTO[],
    flightFrom: FlightItemDTO,
    memo: FlightObject,
  ) {
    const key = `${flightFrom.from}_${flightFrom.to}`;
    if (key in memo) return memo[key];
    else memo[key] = [flightFrom];
    const flightToIndex = itinerary.findIndex(
      (flight) => flight.from === flightFrom.to,
    );
    if (flightToIndex >= 0) {
      const flightTo = itinerary[flightToIndex];
      memo[key].push(...this.findDestination(itinerary, flightTo, memo));
    }
    return memo[key];
  }
}
