import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventInfo } from '../../interfaces/event-info';
import { Session } from '../../interfaces/session';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent {
  //TODO: All this event emitting can be avoided by using redux or a service to store the cart
  @Input() eventInfo?: EventInfo; // Event info object to store event details
  @Output() addToCartEvent = new EventEmitter<Session>(); // Event emitter to add a session to the cart
  @Output() removeFromCartEvent = new EventEmitter<Session>(); // Event emitter to remove a session from the cart

  constructor() { }

  addToCart(session: Session): void {
    this.addToCartEvent.emit(session as Session);
  }

  removeFromCart(session: Session): void {
    this.removeFromCartEvent.emit(session as Session);
  }

}
