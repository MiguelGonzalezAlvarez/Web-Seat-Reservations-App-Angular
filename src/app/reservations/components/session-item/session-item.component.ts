import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Session } from '../../interfaces/session';
import { IMAGES_PATH, MINUS_ICON, PLUS_ICON } from '../../constants/constants';

@Component({
  selector: 'app-session-item',
  templateUrl: './session-item.component.html',
  styleUrls: ['./session-item.component.scss']
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

    this.addToCartEvent.emit(session as Session);
  }

  removeFromCart(session: Session): void {
    // Prevent removing more sessions than added
    if (session.quantity === '0') {
      return;
    }

    this.removeFromCartEvent.emit(session as Session);
  }

}
