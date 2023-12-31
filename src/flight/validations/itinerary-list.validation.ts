import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { FlightsDTO } from '../dtos/create-flights.dto';

@Injectable()
export class ValidateArrayItineraryPipe implements PipeTransform<any> {
  async transform(flightsData: FlightsDTO) {
    if (!Array.isArray(flightsData.flights)) {
      throw new BadRequestException('Invalid input data. Expected an array.');
    }
    // check if array have many elements with same destination or same starting point
    const flights = flightsData.flights;
    const memoFrom = {};
    const memoTo = {};
    for (let i = 0; i < flights.length; i++) {
      const { from, to } = flights[i];
      if (from in memoFrom) {
        throw new BadRequestException(`Duplicate starting point ${from}`);
      } else memoFrom[from] = true;
      if (to in memoTo) {
        throw new BadRequestException(`Duplicate destination ${to}`);
      } else memoTo[to] = true;
    }
    // we just have 1 destination orphan and 1 starting point lost
    let checkFromOrphan = 0;
    let checkToOrphan = 0;
    for (const fromValue in memoFrom) {
      if (!(fromValue in memoTo)) {
        if (checkFromOrphan === 0) checkFromOrphan += 1;
        else
          throw new BadRequestException(
            `Starting point ${fromValue} is orphan  `,
          );
      }
    }
    for (const toValue in memoTo) {
      if (!(toValue in memoFrom)) {
        if (checkToOrphan === 0) checkToOrphan += 1;
        else
          throw new BadRequestException(
            `Destination point ${toValue} is orphan`,
          );
      }
    }
    return flightsData;
  }
}
