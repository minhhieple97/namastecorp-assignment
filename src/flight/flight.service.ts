import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from './flight.entity';
import { FlightData, FlightsData } from './dto/create-flights.dto';
import { Request } from 'src/request/request.entity';
import { FlightRequest } from './flight-request.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Worker } from 'worker_threads';
import { resolve } from 'path';
import { workerThreadSortItineraryFilePath } from 'src/workers/config';
import { FlightResponse } from './interfaces/flight.interface';
@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
    @InjectRepository(FlightRequest)
    private readonly flightRequestRepository: Repository<FlightRequest>,
    private connection: DataSource,
  ) {}

  async createRequestWithFlights(
    ip: string,
    user: User,
    flightsData: FlightsData,
  ): Promise<FlightResponse[]> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const sortedItinerary = await this.sortItinerary(flightsData.flights);
      const request = await queryRunner.manager.save(Request, {
        ip,
        user,
      });
      const flights = sortedItinerary.map((flightData) => {
        const flight = new Flight();
        flight.from = flightData.from;
        flight.to = flightData.to;
        flight.user = user;
        return flight;
      });
      const flightsRecord = await queryRunner.manager.save(Flight, flights);
      const flightsRequest = flightsRecord.map((flightRecord) => {
        const flightRequest = new FlightRequest();
        flightRequest.flight = flightRecord;
        flightRequest.request = request;
        return flightRequest;
      });
      await queryRunner.manager.save(FlightRequest, flightsRequest);
      await queryRunner.commitTransaction();
      return flightsRecord.map((el) => {
        return {
          id: el.id,
          from: el.from,
          to: el.to,
          createdAt: el.createdAt,
          updatedAt: el.updatedAt,
        };
      });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    }
  }

  async sortItinerary(flightsData: FlightData[]): Promise<FlightData[]> {
    const worker = new Worker(workerThreadSortItineraryFilePath, {
      workerData: flightsData,
    });

    return new Promise((resolve, reject) => {
      worker.on('message', (result) => {
        resolve(result);
      });

      worker.on('error', (err) => {
        reject(err);
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }
}
