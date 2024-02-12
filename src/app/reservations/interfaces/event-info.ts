import { Event } from "./event";
import { Session } from "./session";

export interface EventInfo {
    event: Event;
    sessions: Session[];
}