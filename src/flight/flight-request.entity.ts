import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Flight } from './flight.entity';
import { Request } from 'src/request/request.entity';
import { MyBaseEntity } from 'src/orm/base.entity';

@Entity('flight-requests')
export class FlightRequest extends MyBaseEntity {
  @ManyToOne(() => Flight)
  @JoinColumn({ name: 'flight_id' })
  flight: Flight;

  @ManyToOne(() => Request)
  @JoinColumn({ name: 'request_id' })
  request: Request;
}
