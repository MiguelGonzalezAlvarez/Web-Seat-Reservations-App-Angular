import { Reservation } from 'src/app/reservations/interfaces/reservation';
import { OrderByDatePipe } from './order-by-date.pipe';

describe('OrderByDatePipe', () => {
  let pipe: OrderByDatePipe;

  beforeEach(() => {
    pipe = new OrderByDatePipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should return an empty array if the input array is empty', () => {
      const input: Reservation[] = [];
      const result = pipe.transform(input);

      expect(result).toEqual([]);
    });

    it('should order an array of sessions by date', () => {
      const input = [
        { date: '1447196400002' },
        { date: '1447196400007' },
        { date: '1447196400001' }
      ];
      const result = pipe.transform(input);

      expect(result).toEqual([
        { date: '1447196400001' },
        { date: '1447196400002' },
        { date: '1447196400007' }
      ]);
    });

    it('should order an array of events by endDate', () => {
      const input = [
        { endDate: '1447196400002' },
        { endDate: '1447196400007' },
        { endDate: '1447196400001' }
      ];
      const result = pipe.transform(input);

      expect(result).toEqual([
        { endDate: '1447196400001' },
        { endDate: '1447196400002' },
        { endDate: '1447196400007' }
      ]);
    });

    it('should handle null endDates', () => {
      const input = [
        { endDate: null },
        { endDate: '1447196400001' },
        { endDate: '1447196400002' }
      ];
      const result = pipe.transform(input);

      expect(result).toEqual([
        { endDate: null },
        { endDate: '1447196400001' },
        { endDate: '1447196400002' }
      ]);

    });

    it('should handle null dates ', () => {
      const input = [
        { date: null },
        { date: '1447196400001' },
        { date: '1447196400002' }
      ];
      const result = pipe.transform(input);

      expect(result).toEqual([
        { date: null },
        { date: '1447196400001' },
        { date: '1447196400002' }
      ]);

    });

  });

});