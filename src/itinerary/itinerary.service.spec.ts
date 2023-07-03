import { Test } from '@nestjs/testing';
import { ItineraryService } from './itinerary.service';

describe('UserCalculateService', () => {
  let service: ItineraryService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ItineraryService],
    }).compile();
    service = moduleRef.get<ItineraryService>(ItineraryService);
  });

  describe('sortItinerary', () => {
    it('should sort the itinerary in the correct order', () => {
      const inputItineraryList = [
        {
          from: 'HN',
          to: 'HCM',
        },
        {
          from: 'HCM',
          to: 'SFO',
        },
        {
          from: 'GRU',
          to: 'SCL',
        },
        {
          from: 'SFO',
          to: 'GRU',
        },
        {
          from: 'CDG',
          to: 'SYD',
        },
        {
          from: 'SCL',
          to: 'LHR',
        },
        {
          from: 'LHR',
          to: 'CDG',
        },
        {
          from: 'SYD',
          to: 'JFK',
        },
        {
          from: 'JFK',
          to: 'BEJ',
        },
      ];
      const expectedItineraryList = [
        {
          from: 'HN',
          to: 'HCM',
        },
        {
          from: 'HCM',
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
        {
          from: 'SCL',
          to: 'LHR',
        },
        {
          from: 'LHR',
          to: 'CDG',
        },
        {
          from: 'CDG',
          to: 'SYD',
        },
        {
          from: 'SYD',
          to: 'JFK',
        },
        {
          from: 'JFK',
          to: 'BEJ',
        },
      ];

      const sortedItinerary = service.sortItinerary(inputItineraryList);
      expect(sortedItinerary).toEqual(expectedItineraryList);
    });

    it('should return array with just one item', () => {
      const itinerary = [
        {
          from: 'EZE',
          to: 'MIA',
        },
      ];
      const sortedItinerary = service.sortItinerary(itinerary);
      expect(sortedItinerary).toEqual(itinerary);
    });
  });
});
