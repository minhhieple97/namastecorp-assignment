import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { JOB_NAME, QUEUE_NAME } from 'src/common/config/constants';
import { FlightRepository } from 'src/flight/flight.repository';
import { JobDataItinerary } from 'src/itinerary/interfaces/itinerary.interface';

@Processor(QUEUE_NAME.ITINERARY)
export class IitineraryQueue {
  constructor(private readonly flightRepository: FlightRepository) {}

  @Process(JOB_NAME.INSERT_ITINERARY)
  async processFile(job: Job) {
    const data: JobDataItinerary = job.data;
    await this.flightRepository.createRequestWithFlights(data);
  }
}
