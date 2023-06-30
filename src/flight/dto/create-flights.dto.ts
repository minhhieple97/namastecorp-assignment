import {
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsString,
  Validate,
  ValidationError,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FlightData {
  @IsString()
  from: string;

  @IsString()
  to: string;
}

export class FlightsData {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => FlightData)
  // @Validate(this.itineraryService)
  flights: FlightData[];
}

function validateItineraryList(value: FlightData[]) {
  // check if array have many elements with same destination
  const memoFrom = {};
  const memoTo = {};
  for (let i = 0; i < value.length; i++) {
    const { from, to } = value[i];
    if (from in memoFrom) throw new ValidationError();
    else memoFrom[from] = to;
    if (to in memoTo) throw new ValidationError();
    else memoTo[to] = from;
  }
  let checkFromOrphan = 0;
  let checkToOrphan = 0;
  for (const fromValue in memoFrom) {
    if (!(fromValue in memoTo) && checkFromOrphan < 1) {
      checkFromOrphan += 1;
    } else {
      if (!(fromValue in memoTo) && checkFromOrphan < 1) {
        checkFromOrphan += 1;
      }
    }
  }
}
