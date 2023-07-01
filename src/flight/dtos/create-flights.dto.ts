import {
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsString,
  IsNotEmpty,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FlightItemDTO {
  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;
}

export class FlightsDTO {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => FlightItemDTO)
  flights: FlightItemDTO[];
}
