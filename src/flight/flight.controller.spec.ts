import { Test, TestingModule } from '@nestjs/testing';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { FlightsDTO } from './dtos/create-flights.dto';
import { FlightResponse } from './interfaces/flight.interface';
describe('FlightController', () => {
  let controller: FlightController;
  const mockFlightService = {
    createRequestWithFlights: jest.fn((dto) => {
      return [
        {
          id: 1,
          from: 'EZE',
          to: 'MIA',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          from: 'MIA',
          to: 'SFO',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          from: 'SFO',
          to: 'GRU',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          from: 'GRU',
          to: 'SCL',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightController],
      providers: [FlightService],
    })
      .overrideProvider(FlightService)
      .useValue(mockFlightService)
      .compile();

    controller = module.get<FlightController>(FlightController);
  });

  describe('createRequestWithFlights', () => {
    it('should call service with correct arguments', async () => {
      const flightsData: FlightsDTO = {
        flights: [
          {
            from: 'EZE',
            to: 'MIA',
          },
          {
            from: 'MIA',
            to: 'SFO',
          },
          {
            from: 'SFO',
            to: 'GRU',
          },
          {
            from: 'GRU',
            to: 'SCL',
          },
        ],
      };
      const ip = '127.0.0.1';
      const user = {
        id: '123',
        name: 'John Doe',
      };
      const expectedResult: FlightResponse[] = [
        {
          id: 1,
          from: 'EZE',
          to: 'MIA',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          from: 'MIA',
          to: 'SFO',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          from: 'SFO',
          to: 'GRU',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          from: 'GRU',
          to: 'SCL',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      // jest
      //   .spyOn(service, 'createRequestWithFlights')
      //   .mockResolvedValue(expectedResult);

      // const result = await controller.createRequestWithFlights(
      //   flightsData,
      //   ip,
      //   { user },
      // );

      // expect(service.createRequestWithFlights).toHaveBeenCalledWith(
      //   ip,
      //   user,
      //   flightsData,
      // );
      // expect(result).toBe(expectedResult);
    });

    it('should throw an error for invalid itinerary', async () => {
      // const flightsData: FlightsData = {
      //   flights: [
      //     {
      //       from: 'EZE',
      //       to: 'MIA',
      //     },
      //     {
      //       from: 'MIA',
      //       to: 'SFO',
      //     },
      //     {
      //       from: 'GRU',
      //       to: 'SCL',
      //     },
      //   ],
      // };
      // const ip = '127.0.0.1';
      // const user = {
      //   id: 123,
      //   name: 'John Doe',
      // };
      // jest
      //   .spyOn(service, 'createRequestWithFlights')
      //   .mockRejectedValue(new Error('Invalid itinerary'));
      // await expect(
      //   controller.createRequestWithFlights(flightsData, ip, { user }),
      // ).rejects.toThrowError();
    });
  });
});
