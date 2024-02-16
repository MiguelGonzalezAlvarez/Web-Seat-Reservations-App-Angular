import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReservationDetail } from '../../reservations/interfaces/reservation-detail';
import { Session } from '../../reservations/interfaces/session';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartSubject: BehaviorSubject<ReservationDetail[]> = new BehaviorSubject<ReservationDetail[]>([]);
  cartObservable: Observable<ReservationDetail[]> = this.cartSubject.asObservable();

  get cart(): Observable<ReservationDetail[]> {
    return this.cartObservable;
  }

  setCart(cart: ReservationDetail[]): void {
    this.cartSubject.next(cart);
  }

  addToCart(selectedReservationDetail: ReservationDetail, session: Session): void {
    const cart = this.cartSubject.value;
    const reservationInCart = cart.find((cartReservationDetail: ReservationDetail) => cartReservationDetail?.reservation?.id === selectedReservationDetail?.reservation?.id);

    session.quantity = (+session.quantity! + 1).toString();

    // If the selected reservation is not added to the cart, add the selected reservation to the cart
    if (!reservationInCart) {
      this.addReservationDetail(selectedReservationDetail, session);
      return;
    }

    // If the selected reservation is already added to the cart, update the session of the selected reservation
    this.updateSessions(reservationInCart, session);
  }

  removeFromCart(selectedReservationDetail: ReservationDetail, session: Session): void {
    const cart = this.cartSubject.value;
    const reservationInCart = cart.find(
      (cartReservationDetail: ReservationDetail) => cartReservationDetail?.reservation?.id === selectedReservationDetail?.reservation?.id
    );

    if (!reservationInCart) {
      console.log('Event not found in the cart');
      return;
    }

    session.quantity = (+session.quantity! - 1).toString();

    if (session.quantity === '0') {
      this.cleanSessions(reservationInCart, session);
    } else {
      this.updateSessions(reservationInCart, session);
    }

  }

  private addReservationDetail(selectedReservationDetail: ReservationDetail, session: Session): void {
    const cart = this.cartSubject.value;
    const cartEvent: ReservationDetail = {
      reservation: selectedReservationDetail.reservation,
      sessions: [session]
    };

    this.cartSubject.next([...cart, cartEvent]);
  }

  private removeReservationDetail(reservationDetail: ReservationDetail): void {
    const cart = this.cartSubject.value;
    const eventIndexToRemove = cart.findIndex(
      (cartReservationDetail: ReservationDetail) => reservationDetail.reservation.id === cartReservationDetail.reservation.id
    );

    if (eventIndexToRemove === -1) {
      console.log('Event not found in the cart');
      return;
    }

    cart.splice(eventIndexToRemove, 1);
    this.cartSubject.next([...cart]);
  }

  private updateSessions(cartReservationDetail: ReservationDetail, session: Session): void {
    const cart = this.cartSubject.value;
    // Find if there is a session with the same date in the cart
    const sessionIndex = cartReservationDetail.sessions.findIndex(
      (cartSession: Session) => cartSession.date === session.date
    );

    if (sessionIndex === -1) {
      cartReservationDetail.sessions.push(session);
    } else {
      // If we find a session with the same date, update the session
      cartReservationDetail.sessions[sessionIndex] = session;
    }

    this.cartSubject.next([...cart]);
  }

  private cleanSessions(reservationInCart: ReservationDetail, session: Session): void {
    // Remove the selected session from the reservation
    const remainingSessions = reservationInCart.sessions.filter((cartSelectedSession: Session) => cartSelectedSession.date !== session.date);

    // When there are no sessions remaining for that reservation, remove that reservation from the cart
    if (remainingSessions.length === 0) {
      this.removeReservationDetail(reservationInCart);
      return;
    }

    // When there are sessions remaining for that reservation, remove the selected session from the reservation
    reservationInCart.sessions = remainingSessions;
  }

}