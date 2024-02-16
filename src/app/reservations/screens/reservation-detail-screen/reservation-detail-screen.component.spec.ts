import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ReservationDetailScreenComponent } from './reservation-detail-screen.component';
import { ReservationsService } from '../../services/reservations.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Session } from '../../interfaces/session';
import { ReservationDetail } from '../../interfaces/reservation-detail';
import { Reservation } from '../../interfaces/reservation';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Agrega esta importación

describe('ReservationDetailScreenComponent', () => {
  let component: ReservationDetailScreenComponent;
  let fixture: ComponentFixture<ReservationDetailScreenComponent>;
  let router: Router;
  let shoppingCartService: ShoppingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationDetailScreenComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } } } },
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
        ReservationsService,
        ShoppingCartService,
        ChangeDetectorRef
      ],
      imports: [
        RouterTestingModule,
        CommonModule,
        SharedModule,
        HttpClientTestingModule 
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationDetailScreenComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    shoppingCartService = TestBed.inject(ShoppingCartService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update reservation detail on initialization', () => {
    const mockReservation: Reservation = { id: 1, title: 'Reservation 1', subtitle: 'Subtitle 1', image: 'Image 1' };
    const mockSessions: Session[] = [
      { id: 1, date: '2022-01-01', availability: '10', quantity: '0' }
    ];
    const reservationDetail: ReservationDetail = { reservation: mockReservation, sessions: mockSessions };
    const reservationsService = TestBed.inject(ReservationsService);
    spyOn(reservationsService, 'getReservationDetails').and.returnValue(of(reservationDetail));

    fixture.detectChanges();

    expect(component.reservationDetail).toEqual(reservationDetail);
  });

  it('should add session to cart', () => {
    const mockReservation: Reservation = { id: 1, title: 'Reservation 1', subtitle: 'Subtitle 1', image: 'Image 1' };
    const mockSession = { id: 1, date: '2022-01-01', availability: '10', quantity: '0' };
    const reservationDetail: ReservationDetail = { reservation: mockReservation, sessions: [] };
    spyOn(shoppingCartService, 'addToCart');

    component.reservationDetail = reservationDetail;
    component.addToCart(mockSession, reservationDetail);

    expect(shoppingCartService.addToCart).toHaveBeenCalledWith(reservationDetail, mockSession);
  });

  it('should navigate to reservations', () => {
    component.navigateToReservations();
    expect(router.navigate).toHaveBeenCalledWith(['seat-reservation-app/reservations']);
  });

});
