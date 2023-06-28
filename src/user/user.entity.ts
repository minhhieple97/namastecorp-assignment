import { Flight } from 'src/flight/flight.entity';
import { MyBaseEntity } from 'src/orm/base.entity';
import { Entity, Column, Index, OneToMany } from 'typeorm';

@Entity('users')
export class User extends MyBaseEntity {
  @Column()
  name: string;

  @Index({ unique: true })
  @Column({ name: 'api_key' })
  apiKey: string;

  @OneToMany(() => Flight, (flight) => flight.user)
  flights: Flight[];
}
