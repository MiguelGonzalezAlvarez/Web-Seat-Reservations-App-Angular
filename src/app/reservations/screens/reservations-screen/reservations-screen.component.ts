import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ReservationsService } from '../../services/reservations.service';
import { Reservation } from '../../interfaces/reservation';

@Component({
  selector: 'reservations-screen',
  templateUrl: './reservations-screen.component.html',
  styleUrls: ['./reservations-screen.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationsScreenComponent implements OnInit, OnDestroy {
  private reservationsSubscription?: Subscription;

  public reservationsList: Reservation[] = [];

  constructor(
    private reservationsService: ReservationsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getReservations();
  }

  ngOnDestroy(): void {
    if (this.reservationsSubscription) {
      this.reservationsSubscription.unsubscribe();
    }
  }

  private getReservations(): void {
    this.reservationsSubscription = this.reservationsService.getReservations().subscribe(
      {
        next: (data) => {
          this.reservationsList = data;
          this.cdr.markForCheck();
        },
        error: (error) => console.error(`An error has occurred while fetching Reservations: ${error}`),
        complete: () => console.log('Event list fetched successfully')
      }
    );
  }

}