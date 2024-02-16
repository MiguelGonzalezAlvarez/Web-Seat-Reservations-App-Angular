import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Session } from '../../interfaces/session';
import { IMAGES_PATH, PLUS_ICON, MINUS_ICON } from '../../constants/reservation-urls';

@Component({
  selector: 'session-item',
  templateUrl: './session-item.component.html',
  styleUrls: ['./session-item.component.css']
})
export class SessionItemComponent {
  @Input() session?: Session;
  @Output() addToCartEvent = new EventEmitter<Session>();
  @Output() removeFromCartEvent = new EventEmitter<Session>();

  plusIconUrl = `../../../../${IMAGES_PATH}${PLUS_ICON}`; 
  minusIconUrl = `../../../../${IMAGES_PATH}${MINUS_ICON}`; 

  addToCart(session: Session): void {
    // Prevent adding more sessions than available
    if (session.quantity === session.availability) {
      return;
    }

    this.addToCartEvent.emit(session);
  }

  removeFromCart(session: Session): void {
    // Prevent removing more sessions than added
    if (session.quantity === '0') {
      return;
    }

    this.removeFromCartEvent.emit(session);
  }

}
