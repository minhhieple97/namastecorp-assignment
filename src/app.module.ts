import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestModule } from './request/request.module';
import { FlightModule } from './flight/flight.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyMiddleware } from './middlewares/api-key.middleware';
import { dataSourceOptions } from './db/data-source';
import { ItineraryModule } from './itinerary/itinerary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    RequestModule,
    FlightModule,
    UserModule,
    ItineraryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('flights');
  }
}
