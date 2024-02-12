import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMAGES_PATH, TRASH_ICON } from 'src/app/reservations/constants/constants';
import { EventInfo } from 'src/app/reservations/interfaces/event-info';
import { Session } from 'src/app/reservations/interfaces/session';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  deleteIconUrl = `../../../../${IMAGES_PATH}${TRASH_ICON}`; // Path to the delete icon image
  @Input() cart: EventInfo[] = []; // Array to store selected sessions in the cart
  @Output() removeFromCart = new EventEmitter<{ eventInfo: EventInfo, session: Session }>(); // Event emitter to remove a session from the cart

  constructor() { }

  // Remove the selected session from the cart
  removeSessionFromCart(session: Session, eventInfo: EventInfo): void {
    this.removeFromCart.emit({ eventInfo, session });
  }

}
