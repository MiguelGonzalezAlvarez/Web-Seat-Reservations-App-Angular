import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReservationDetail } from '../../../reservations/interfaces/reservation-detail';
import { Session } from '../../../reservations/interfaces/session';
import { IMAGES_PATH, TRASH_ICON } from '../../../reservations/constants/reservation-urls';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  private reservationDetailSubscription?: Subscription;
  private cartSubscription?: Subscription;

  cart: ReservationDetail[] = [];
  deleteIconUrl = `../../../../${IMAGES_PATH}${TRASH_ICON}`;

  @Output() removeFromCart = new EventEmitter<{ reservationDetail: ReservationDetail, session: Session }>(); // Event emitter to remove a session from the cart

  constructor(private shoppingCartService: ShoppingCartService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cartSubscription = this.shoppingCartService.cart.subscribe(cart => {
      this.cart = cart;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if (this.reservationDetailSubscription) {
      this.reservationDetailSubscription.unsubscribe();
    }

    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  setShoppingCartServiceForTesting(testingShoppingCartService: ShoppingCartService): void {
    this.shoppingCartService = testingShoppingCartService;
  }

  removeSessionFromCart(session: Session, reservationDetail: ReservationDetail): void {
    this.removeFromCart.emit({ reservationDetail, session });
  }

}
