import { Injectable } from '@nestjs/common';
import { FlightItemDTO, FlightsDTO } from './dtos/create-flights.dto';
import { User } from 'src/user/user.entity';
import { Worker } from 'worker_threads';
import { workerThreadSortItineraryFilePath } from 'src/workers/config';
import { FlightResponse } from './interfaces/flight.interface';
import { FlightRepository } from './flight.repository';
@Injectable()
export class FlightService {
  constructor(private readonly flightRepository: FlightRepository) {}

  async createRequestWithFlights(
    ip: string,
    user: User,
    flightsData: FlightsDTO,
  ): Promise<FlightResponse[]> {
    const sortedItinerary = await this.getSortedItinerary(flightsData.flights);
    return this.flightRepository.createRequestWithFlights(
      ip,
      user,
      sortedItinerary,
    );
  }

  async getSortedItinerary(
    flightsData: FlightItemDTO[],
  ): Promise<FlightItemDTO[]> {
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
