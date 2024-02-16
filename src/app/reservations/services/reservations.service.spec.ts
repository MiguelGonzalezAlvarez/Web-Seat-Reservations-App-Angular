import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReservationsService } from './reservations.service';
import { Reservation } from '../interfaces/reservation';
import { ReservationDetail } from '../interfaces/reservation-detail';
import { DATA_PATH, EVENTS_URL, EVENT_INFO_URL } from '../constants/reservation-urls';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservationsService]
    });
    service = TestBed.inject(ReservationsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getReservations', () => {
    it('should return reservations', () => {
      const mockReservations: Reservation[] = [
        { id: 1, title: 'Reservation 1', subtitle: 'Subtitle 1', image: 'Image 1' },
        { id: 2, title: 'Reservation 2', subtitle: 'Subtitle 2', image: 'Image 2' }
      ];

      service.getReservations().subscribe((reservations: Reservation[]) => {
        expect(reservations).toEqual(mockReservations);
      });

      const req = httpTestingController.expectOne(`${DATA_PATH}${EVENTS_URL}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockReservations);
    });

    it('should handle errors', () => {
      const errorMessage = 'Something went wrong, please try again later.';

      service.getReservations().subscribe({
        next: () => fail('Expected an error, but did not get one'),
        error: (error) => {
          expect(error).toBeTruthy();
          expect(error.message).toBe(errorMessage);
        },
        complete: () => console.log('Event info fetched successfully')
      });

      const req = httpTestingController.expectOne(`${DATA_PATH}${EVENTS_URL}`);
      req.error(new ProgressEvent('error'));
    });
  });

  describe('getReservationDetails', () => {
    it('should return reservation details', () => {
      const mockReservation: Reservation = { id: 1, title: 'Reservation 1', subtitle: 'Subtitle 1', image: 'Image 1' };
      const mockSessions = [
        { id: 1, date: '2022-01-01', availability: '10', quantity: '0' }
      ];

      const mockReservationDetail: ReservationDetail = {
        reservation: mockReservation,
        sessions: mockSessions
      };

      service.getReservationDetails(1).subscribe((reservationDetail: ReservationDetail) => {
        expect(reservationDetail).toEqual(mockReservationDetail);
      });

      const req = httpTestingController.expectOne(`${DATA_PATH}${EVENT_INFO_URL.replace(':id', '1')}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockReservationDetail);
    });

    it('should handle errors', () => {
      const errorMessage = 'Something went wrong, please try again later.';

      service.getReservationDetails(1).subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(error.message).toBe(errorMessage);
        }
      });

      const req = httpTestingController.expectOne(`${DATA_PATH}${EVENT_INFO_URL.replace(':id', '1')}`);
      req.error(new ProgressEvent('error'));
    });
  });
  
});