import { TestBed } from '@angular/core/testing';
import { ShoppingCartService } from './shopping-cart.service';
import { ReservationDetail } from '../../reservations/interfaces/reservation-detail';
import { Session } from '../../reservations/interfaces/session';
import { Reservation } from '../../reservations/interfaces/reservation';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add reservation detail to cart', () => {
    const mockReservation: Reservation = { id: 1, title: 'Reservation 1', subtitle: 'Subtitle 1', image: 'Image 1' };
    const selectedReservationDetail: ReservationDetail = {
      reservation: mockReservation,
      sessions: []
    };
    const session: Session = { id: 1, date: '2022-02-15', quantity: '1', availability: '10' };

    service.addToCart(selectedReservationDetail, session);
    service.cart.subscribe((cart) => {
      expect(cart.length).toBe(1);
      expect(cart[0].reservation.id).toBe(1);
      expect(cart[0].sessions.length).toBe(1);
    });
  });

  it('should update session in cart', () => {
    const mockReservation: Reservation = { id: 1, title: 'Reservation 1', subtitle: 'Subtitle 1', image: 'Image 1' };
    const mockSession = { id: 1, date: '2022-02-15', quantity: '1', availability: '10' };
    const selectedReservationDetail: ReservationDetail = {
      reservation: mockReservation,
      sessions: [mockSession]
    };
    const session: Session = { id: 1, date: '2022-02-15', quantity: '2', availability: '10' };

    service.setCart([selectedReservationDetail]);

    service.addToCart(selectedReservationDetail, session);
    service.cart.subscribe((cart) => {
      expect(cart.length).toBe(1);
      expect(cart[0].reservation.id).toBe(1);
      expect(cart[0].sessions.length).toBe(1);
      expect(cart[0].sessions[0].quantity).toBe('3');
    });
  });

  it('should remove session from cart', () => {
    const mockReservation: Reservation = { id: 1, title: 'Reservation 1', subtitle: 'Subtitle 1', image: 'Image 1' };
    const mockSession = { id: 1, date: '2022-02-15', quantity: '1', availability: '10' };
    const selectedReservationDetail: ReservationDetail = {
      reservation: mockReservation,
      sessions: [mockSession]
    };
    const session: Session = { id: 1, date: '2022-02-15', quantity: '1', availability: '10' };

    service.setCart([selectedReservationDetail]);

    service.removeFromCart(selectedReservationDetail, session);
    service.cart.subscribe((cart) => {
      expect(cart.length).toBe(0);
    });
  });

  it('should remove reservation detail from cart', () => {
    const mockReservation: Reservation = { id: 1, title: 'Reservation 1', subtitle: 'Subtitle 1', image: 'Image 1' };
    const mockSession = { id: 1, date: '2022-02-15', quantity: '1', availability: '10' };
    const selectedReservationDetail: ReservationDetail = {
      reservation: mockReservation,
      sessions: [mockSession]
    };

    service.setCart([selectedReservationDetail]);

    service.removeFromCart(selectedReservationDetail, { id: 1, date: '2022-02-15', quantity: '1', availability: '10' });
    service.cart.subscribe((cart) => {
      expect(cart.length).toBe(0);
    });

  });

});