import {
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsString,
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
  flights: FlightData[];
}
