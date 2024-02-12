import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

import { ReservationsService } from '../../services/reservations.service';
import { EventInfo } from '../../interfaces/event-info';
import { Session } from '../../interfaces/session';

@Component({
  selector: 'app-session-screen',
  templateUrl: './session-screen.component.html',
  styleUrls: ['./session-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionScreenComponent implements OnInit {
  private eventInfoSubscription?: Subscription;

  @Input() eventInfo?: EventInfo; // Event info object to store event details
  cart: EventInfo[] = []; // Array to store selected sessions in the cart

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationsService: ReservationsService,
    private shoppingCartService: ShoppingCartService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Fetch event details based on route parameter event id
    const eventId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : 0;

    // Fetch event data using reservations service
    this.getEventInfo(eventId);

    // Obtain updated cart from the service
    this.cart = this.shoppingCartService.getCart();
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

    // Marcar para la detección de cambios
    this.cdr.markForCheck();
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

    // Marcar para la detección de cambios
    this.cdr.markForCheck();
  }

  navigateToCatalog(): void {
    this.router.navigate(['/reservations/catalog']);
  }

  private getEventInfo(eventId: number): void {
    this.eventInfoSubscription = this.reservationsService.getEventInfo(eventId).subscribe({
      next: (eventInfo: EventInfo) => {
        this.eventInfo = eventInfo;
        // Marcar para la detección de cambios
        this.cdr.markForCheck();
      },
      error: (error) => console.error('Error fetching event data', error),
      complete: () => console.log('Event info fetched successfully')
    });
  }

  private updateEventDetails(session: Session): void {
    // Function to update the event details with the selected session so the quantity is updated
    // avoiding discrepancies between the session quantity and the cart quantity
    if (!this.eventInfo) {
      console.error('Event details not found');
      return;
    }

    const existingSessionIndex = this.eventInfo.sessions.findIndex(
      (existingSession: Session) => existingSession.date === session.date
    );

    if (existingSessionIndex === -1) {
      console.log('The session deleted was from a different event. No need to update the event details');
      return;
    }

    this.eventInfo.sessions = [...this.eventInfo.sessions];
    this.eventInfo.sessions[existingSessionIndex] = session;
  }
}