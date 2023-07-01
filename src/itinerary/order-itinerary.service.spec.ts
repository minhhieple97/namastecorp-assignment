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
      const inputItinerary = [
        {
          from: 'MIA',
          to: 'SFO',
        },
        {
          from: 'EZE',
          to: 'MIA',
        },
        {
          from: 'GRU',
          to: 'SCL',
        },
        {
          from: 'SFO',
          to: 'GRU',
        },
      ];
      const expectedItinerary = [
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
      const sortedItinerary = service.sortItinerary(inputItinerary);
      expect(sortedItinerary).toEqual(expectedItinerary);
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
