import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Session } from '../../interfaces/session';
import { ReservationDetail } from '../../interfaces/reservation-detail';

@Component({
  selector: 'sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.css']
})
export class SessionsListComponent {
  @Input() reservationDetail?: ReservationDetail; 
  @Output() addToCartEvent = new EventEmitter<Session>(); 
  @Output() removeFromCartEvent = new EventEmitter<Session>(); 

  constructor() { }

  addToCart(session: Session): void {
    this.addToCartEvent.emit(session);
  }

  removeFromCart(session: Session): void {
    this.removeFromCartEvent.emit(session);
  }

}
