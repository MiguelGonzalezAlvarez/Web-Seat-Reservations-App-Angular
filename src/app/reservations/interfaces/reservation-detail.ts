import { Reservation } from "./reservation";
import { Session } from "./session";

export interface ReservationDetail {
    reservation: Reservation;
    sessions: Session[];
}