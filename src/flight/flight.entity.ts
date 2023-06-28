import { MyBaseEntity } from 'src/orm/base.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('flights')
export class Flight extends MyBaseEntity {
  @Column()
  from: string;

  @Column()
  to: string;

  @ManyToOne(() => User, (user) => user.flights)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
