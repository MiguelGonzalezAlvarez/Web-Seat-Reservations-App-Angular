import { Injectable } from '@angular/core';
import { EventInfo } from '../../reservations/interfaces/event-info';
import { Session } from 'src/app/reservations/interfaces/session';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  // TODO: Replace all this logic with redux state management
  // For this technical test I will use a service to manage the shopping cart state
  // This is not the best approach for a real application
  // The best approach would be to use a state management library like NgRx or Akita
  cart: EventInfo[] = []; // Array to store selected sessions in the cart

  constructor() { }

  getCart(): EventInfo[] {
    return [...this.cart]; // Return a copy of the cart
  }

  setCart(cart: EventInfo[]): void {
    this.cart = cart;
  }

  addToCart(selectedEventInfo: EventInfo, session: Session): void {
    const alreadyAddedEventInfo = this.cart.find(
      (eventDetails: EventInfo) => this.checkEventInfoAlreadyAdded(selectedEventInfo, eventDetails)
    );

    if (!alreadyAddedEventInfo) {
      this.addEventToCart(selectedEventInfo, session);
      return;
    }

    // If the selected event is already added to the cart, update the selected event in the cart
    this.updateEventInCart(alreadyAddedEventInfo, session);
  }

  
  removeFromCart(selectedEventInfo: EventInfo, session: Session): void {
    const eventInfoAlreadyAdded = this.cart.find(
      (eventDetails: EventInfo) => this.checkEventInfoAlreadyAdded(selectedEventInfo, eventDetails)
    );

    // If the selected event is not added to the cart exit the function
    // Not possible to remove a session from an event that is not in the cart
    if (!eventInfoAlreadyAdded) {
      console.log('Event not found in the cart');
      return;
    }

    console.log(session.quantity);

    // If the selected session is in the cart and the quantity is 0, remove the session from the cart
    if (session.quantity === '0') {
      // Remove the session from the cart
      // const remainingSessions = eventInfoAlreadyAdded.sessions.filter((eventSession: Session) => eventSession.id !== session.id);
      const remainingSessions = eventInfoAlreadyAdded.sessions.filter((eventSession: Session) => eventSession.date !== session.date);

      // If there are no remaining sessions, remove the event from the cart
      if (remainingSessions.length === 0) {
        this.removeEventFromCart(eventInfoAlreadyAdded);
        return;
      }

      // If there are remaining sessions, update the sessions in the cart
      eventInfoAlreadyAdded.sessions = remainingSessions;
    }

  }

  private checkEventInfoAlreadyAdded(selectedEventInfo: EventInfo, eventInfo: EventInfo): boolean {
    return (eventInfo && eventInfo.event.id === selectedEventInfo.event.id);
  }

  private addEventToCart(selectedEventInfo: EventInfo, session: Session): void {
    // If the selected event is not added to the cart, add the selected event to the cart
    const cartEvent: EventInfo = {
      event: selectedEventInfo.event,
      sessions: [session]
    };

    // this.cart.push(cartEvent);
    this.cart = [...this.cart, cartEvent];
  }

  private updateEventInCart(selectedEventInfo: EventInfo, session: Session): void {
    // const sessionIndex = selectedEventInfo.sessions.findIndex(
    //   (eventSession: Session) => eventSession.id === session.id
    // );

    const sessionIndex = selectedEventInfo.sessions.findIndex(
      (eventSession: Session) => eventSession.date === session.date
    );

    // If the selected session is already added to the cart, update the session in the cart
    if (sessionIndex !== -1) {
      selectedEventInfo.sessions[sessionIndex] = session;
      return;
    }

    // If the selected session is not added to the cart, add the selected session to the cart
    selectedEventInfo.sessions.push(session);
  }

  private removeEventFromCart(alreadyAddedEventInfo: EventInfo): void {
    const eventIndexToRemove = this.cart.findIndex(
      (eventInfo: EventInfo) => eventInfo.event.id === alreadyAddedEventInfo.event.id
    );

    // If the event is not in the cart, exit the function
    if (eventIndexToRemove === -1) {
      console.log('Event not found in the cart');
      return;
    }

    this.cart.splice(eventIndexToRemove, 1);
  }

}
