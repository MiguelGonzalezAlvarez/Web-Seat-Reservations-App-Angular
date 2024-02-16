import { Component, Input } from '@angular/core';
import { Reservation } from '../../interfaces/reservation';

@Component({
  selector: 'reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css']
})
export class ReservationsListComponent {
  @Input() reservationsList: Reservation[] = [];
}
