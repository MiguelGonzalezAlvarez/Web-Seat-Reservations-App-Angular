import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

import { ReservationsService } from '../../services/reservations.service';
import { EventInfo } from '../../interfaces/event-info';
import { Session } from '../../interfaces/session';

// import { IMAGES_PATH, TRASH_ICON } from '../../constants/constants';

@Component({
  selector: 'app-session-screen',
  templateUrl: './session-screen.component.html',
  styleUrls: ['./session-screen.component.scss']
})
export class SessionScreenComponent {
  private eventInfoSubscription?: Subscription;

  eventInfo?: EventInfo; // Event info object to store event details

  cart: EventInfo[] = []; // Array to store selected sessions in the cart

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private reservationsService: ReservationsService,
    private shoppingCartService: ShoppingCartService
    ) { }

  ngOnInit(): void {
    // Fetch event details based on route parameter event id
    const eventId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : 0;

    // Fetch event data using reservations service
    this.getEventInfo(eventId);

    // Obtain updated cart from the service
    this.cart = this.shoppingCartService.getCart();
  }

  ngOnDestroy(): void {
    if (this.eventInfoSubscription) {
      this.eventInfoSubscription.unsubscribe();
    }
  }

  addToCart(session: Session, eventInfo: EventInfo): void {
    // Update the session quantity
    session.quantity = session.quantity ? (+session.quantity + 1).toString() : '0';

    // Update the event details with the selected session
    this.updateEventDetails(session);

    // Add the selected session to the cart
    this.shoppingCartService.addToCart(eventInfo, session);

    // Obtain updated cart from the service
    this.cart = this.shoppingCartService.getCart();
  }

  removeFromCart(session: Session, eventInfo: EventInfo): void {
    if (!session.quantity || +session.quantity === 0) {
      console.error('Session quantity is already 0');
      return;
    }

    // Update the session quantity
    session.quantity = session.quantity ? (+session.quantity - 1).toString() : '0';

    // Update the event details with the selected session
    this.updateEventDetails(session);

    // Remove the selected session from the cart
    this.shoppingCartService.removeFromCart(eventInfo, session);

    // Obtain updated cart from the service
    this.cart = this.shoppingCartService.getCart();
  }

  navigateToCatalog(): void {
    this.router.navigate(['/reservations/catalog']);
  }

  private getEventInfo(eventId: number): void {
    this.eventInfoSubscription = this.reservationsService.getEventInfo(eventId).subscribe({
      next: (eventInfo: EventInfo) => {
        this.eventInfo = eventInfo;
      },
      error: (error) => console.error('Error fetching event data', error),
      complete: () => console.log('Event info fetched successfully')
    });

  }

  private updateEventDetails(session: Session): void {
    // Function to update the event details with the selected session so the quantity is updated
    // avoiding discrepancies between the session quantity and the cart quantity
    if(!this.eventInfo) {
      console.error('Event details not found');
      return;
    }

    // const existingSessionIndex = this.eventInfo.sessions.findIndex(
    //   (existingSession: Session) => existingSession.id === session.id
    // );
    const existingSessionIndex = this.eventInfo.sessions.findIndex(
      (existingSession: Session) => existingSession.date === session.date
    );

    if(existingSessionIndex === -1) {
      console.log('The session deleted was from a different event. No need to update the event details');
      return;
    }

    this.eventInfo!.sessions[existingSessionIndex] = session;
  }

}
