import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { Reservation } from '../interfaces/reservation';
import { ReservationDetail } from '../interfaces/reservation-detail';
import { DATA_PATH, EVENTS_URL, EVENT_INFO_URL } from '../constants/reservation-urls';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient) { }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${DATA_PATH}${EVENTS_URL}`).pipe(catchError(this.handleError));
  }

  getReservationDetails(id: number): Observable<ReservationDetail> {
    return this.http.get<ReservationDetail>(`${DATA_PATH}${EVENT_INFO_URL.replace(':id', id.toString())}`).pipe(
      map(this.handleReservationDetail),
      catchError(this.handleError));
  }

  private handleReservationDetail(reservationDetail: ReservationDetail): ReservationDetail {
    // Add a quantity property to each session so we can bind it to the input field
    reservationDetail.sessions = reservationDetail.sessions.map(session => ({
      ...session,
      quantity: '0'
    }));
    return reservationDetail;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong, please try again later.'));
  }

}
