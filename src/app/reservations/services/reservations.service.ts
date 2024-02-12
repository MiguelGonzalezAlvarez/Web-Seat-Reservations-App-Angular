import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { Event } from '../interfaces/event';
import { EventInfo } from '../interfaces/event-info';
import { DATA_PATH, EVENTS_URL, EVENT_INFO_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${DATA_PATH}${EVENTS_URL}`).pipe(catchError(this.handleError));
  }

  getEventInfo(id: number): Observable<EventInfo> {
    return this.http.get<EventInfo>(`${DATA_PATH}${EVENT_INFO_URL.replace(':id', id.toString()) }`).pipe(
      map(this.handleEventInfo),
      catchError(this.handleError));
  }

  private handleEventInfo(eventInfo: EventInfo): EventInfo {
    eventInfo.sessions = eventInfo.sessions.map((session, index) => ({
      ...session,
      // id: index + 1, // Adding 1 to make it 1-based index
      quantity: '0'
    }));
    return eventInfo;
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong, please try again later.'));
  }

}
