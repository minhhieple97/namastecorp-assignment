import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { FlightRequest } from 'src/flight/flight-request.entity';
import { Flight } from 'src/flight/flight.entity';
import { Request } from 'src/request/request.entity';
import { User } from 'src/user/user.entity';
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Flight, Request, FlightRequest],
  synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
};
export default config;
