import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReservationsListComponent } from './reservations-list.component';
import { ReservationItemComponent } from '../reservation-item/reservation-item.component';
import { Reservation } from '../../interfaces/reservation';
import { OrderByDatePipe } from '../../../shared/pipes/order-by-date.pipe';

describe('ReservationsListComponent', () => {
  let component: ReservationsListComponent;
  let fixture: ComponentFixture<ReservationsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationsListComponent, ReservationItemComponent, OrderByDatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationsListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render reservation items', () => {
    const reservations: Reservation[] = [
      { id: 1, title: 'Reservation 1', subtitle: 'Subtitle 1', image: 'Image 1', startDate: '2022-01-01', endDate: '2022-01-05', description: 'Description 1' },
      { id: 2, title: 'Reservation 2', subtitle: 'Subtitle 2', image: 'Image 2', startDate: '2022-02-01', endDate: '2022-02-05', description: 'Description 2' },
    ];

    component.reservationsList = reservations;
    fixture.detectChanges();

    const reservationItems = fixture.debugElement.queryAll(By.directive(ReservationItemComponent));

    expect(reservationItems.length).toBe(reservations.length);

    reservationItems.forEach((item, index) => {
      const reservation = reservations[index];
      const reservationItem = item.componentInstance as ReservationItemComponent;

      expect(reservationItem.cardId).toBe(reservation.id);
      expect(reservationItem.title).toBe(reservation.title);
      expect(reservationItem.subtitle).toBe(reservation.subtitle);
      expect(reservationItem.image).toBe(reservation.image);
      expect(reservationItem.startDate).toBe(reservation.startDate ?? '');
      expect(reservationItem.endDate).toBe(reservation.endDate ?? '');
      expect(reservationItem.description).toBe(reservation.description ?? '');
    });
  });
});
