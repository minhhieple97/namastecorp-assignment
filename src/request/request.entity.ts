import { MyBaseEntity } from 'src/orm/base.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('requests')
export class Request extends MyBaseEntity {
  @Column()
  ip: string;

  @ManyToOne(() => User, (user) => user.flights)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
