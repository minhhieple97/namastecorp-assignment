import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { Flight } from 'src/flight/flight.entity';
import { ItineraryService } from 'src/itinerary/itinerary.service';
import { parentPort, workerData } from 'worker_threads';
async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const itineraryService = app.get(ItineraryService);
  const itinerary: Flight[] = workerData;
  const sortedItinerary = itineraryService.sortItinerary(itinerary);
  parentPort.postMessage(sortedItinerary);
}
run();
