import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ReservationDetail } from '../../../reservations/interfaces/reservation-detail';
import { Session } from '../../../reservations/interfaces/session';
import { of } from 'rxjs';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCartComponent],
      providers: [ChangeDetectorRef]
    });

    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit removeFromCart event when removeSessionFromCart is called', () => {
    const mockReservationDetail: ReservationDetail = {
      reservation: { id: 1, title: 'Reservation 1', subtitle: 'Subtitle 1', image: 'Image 1' },
      sessions: [{ id: 1, date: '2022-02-15', quantity: '1', availability: '10' }]
    };
    const mockSession: Session = { id: 1, date: '2022-02-15', quantity: '1', availability: '10' };
    const testingShoppingCartService: ShoppingCartService = TestBed.inject(ShoppingCartService);

    component.setShoppingCartServiceForTesting(testingShoppingCartService);

    spyOnProperty(testingShoppingCartService, 'cart', 'get').and.returnValue(of([mockReservationDetail]));

    let emittedEvent: { reservationDetail: ReservationDetail, session: Session } | undefined;

    component.removeFromCart.subscribe((event) => {
      emittedEvent = { reservationDetail: mockReservationDetail, session: event.session };
    });

    component.removeSessionFromCart(mockSession, mockReservationDetail);

    expect(emittedEvent).toBeDefined();
    expect(emittedEvent!.reservationDetail).toEqual(mockReservationDetail);
    expect(emittedEvent!.session).toEqual(mockSession);
  });

});