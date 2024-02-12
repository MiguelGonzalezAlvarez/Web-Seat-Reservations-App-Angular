import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { Event } from '../../interfaces/event';
import { ReservationsService } from '../../services/reservations.service';

@Component({
  selector: 'app-catalog-screen',
  templateUrl: './catalog-screen.component.html',
  styleUrls: ['./catalog-screen.component.scss']
})
export class CatalogScreenComponent {
  private eventsSubscription?: Subscription;

  public eventList: Event[] = [];

  constructor(private reservationsService: ReservationsService) { }

  ngOnInit(): void {
    this.getEventList();
  }

  ngOnDestroy(): void {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

  private getEventList(): void {
    this.eventsSubscription = this.reservationsService.getEvents().subscribe(
      {
        next: (data) => {
          this.eventList = data;
        },
        error: (error) => console.error(`An error has ocurred while fetching eventList: ${error}`),
        complete: () => console.log('Event list fetched successfully')
      }
    );
  }

}