import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ReservationsService } from '../../services/reservations.service';
import { Session } from '../../interfaces/session';
import { ReservationDetail } from '../../interfaces/reservation-detail';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { RESERVATION_URL } from '../../constants/reservation-urls';

@Component({
  selector: 'reservation-detail-screen',
  templateUrl: './reservation-detail-screen.component.html',
  styleUrls: ['./reservation-detail-screen.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationDetailScreenComponent implements OnInit, OnDestroy {
  private reservationDetailSubscription = signal<Subscription | undefined>(undefined);
  private cartSubscription = signal<Subscription | undefined>(undefined);

  public reservationDetail = signal<ReservationDetail | undefined>(undefined);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationsService: ReservationsService,
    private shoppingCartService: ShoppingCartService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const eventId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : 0;

    this.getReservationDetail(eventId);
  }

  ngOnDestroy(): void {
    const reservationDetailSubscription = this.reservationDetailSubscription();
    const cartSubscription = this.cartSubscription();

    if (reservationDetailSubscription) {
      reservationDetailSubscription.unsubscribe();
    }

    if (cartSubscription) {
      cartSubscription.unsubscribe();
    }
  }

  addToCart(session: Session, reservationDetail: ReservationDetail): void {
    this.shoppingCartService.addToCart(reservationDetail, session);
  }

  removeFromCart(session: Session, reservationDetail: ReservationDetail): void {
    this.shoppingCartService.removeFromCart(reservationDetail, session);
  }

  navigateToReservations(): void {
    this.router.navigate([RESERVATION_URL]);
  }

  private getReservationDetail(eventId: number): void {
    this.reservationDetailSubscription.set(
      this.reservationsService.getReservationDetails(eventId).subscribe(
        {
          next: (reservationDetail: ReservationDetail) => {
            this.reservationDetail.set(reservationDetail);
            this.cdr.markForCheck();
          },
          error: (error) => console.error('Error fetching event data', error),
          complete: () => console.log('Event info fetched successfully')
        }
      ));
  }

}