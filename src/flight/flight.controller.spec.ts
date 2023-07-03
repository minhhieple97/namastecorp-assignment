import { Test, TestingModule } from '@nestjs/testing';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { FlightsDTO } from './dtos/create-flights.dto';
describe('FlightController', () => {
  let controller: FlightController;
  const mockFlightService = {
    createRequestWithFlights: jest.fn(() => {
      return [
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
      const expectedResult = {
        data: [
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

      const result = await controller.createRequestWithFlights(
        flightsData,
        ip,
        { user },
      );
      expect(result).toEqual(expectedResult);
      expect(mockFlightService.createRequestWithFlights).toHaveBeenCalledWith(
        ip,
        user,
        flightsData,
      );
    });
  });
});
