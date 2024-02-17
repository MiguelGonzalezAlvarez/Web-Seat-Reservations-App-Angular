import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy, signal } from '@angular/core';
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
  private reservationsSubscription = signal<Subscription | undefined>(undefined);
  public reservationsList = signal<Reservation[]>([]);

  constructor(
    private reservationsService: ReservationsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getReservations();
  }

  ngOnDestroy(): void {
    const reservationsSubscription = this.reservationsSubscription();

    if (reservationsSubscription) {
      reservationsSubscription.unsubscribe();
    }

  }

  private getReservations(): void {
    this.reservationsSubscription.set(
      this.reservationsService.getReservations().subscribe(
        {
          next: (data) => {
            this.reservationsList.set(data);
            this.cdr.markForCheck();
          },
          error: (error) => console.error(`An error has occurred while fetching Reservations: ${error}`),
          complete: () => console.log('Event list fetched successfully')
        }
      ));

  }

}