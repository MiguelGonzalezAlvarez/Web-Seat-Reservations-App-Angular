import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsScreenComponent } from './screens/reservations-screen/reservations-screen.component';
import { ReservationDetailScreenComponent } from './screens/reservation-detail-screen/reservation-detail-screen.component';
import { ReservationsListComponent } from './components/reservations-list/reservations-list.component';
import { SharedModule } from '../shared/shared.module';
import { ReservationItemComponent } from './components/reservation-item/reservation-item.component';
import { SessionItemComponent } from './components/session-item/session-item.component';
import { SessionsListComponent } from './components/sessions-list/sessions-list.component';
import { ReservationsRoutingModule } from './reservations-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ReservationsScreenComponent,
    ReservationDetailScreenComponent,
    ReservationsListComponent,
    ReservationItemComponent,
    SessionsListComponent,
    SessionItemComponent
  ],
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    HttpClientModule,
    SharedModule
  ]
})
export class ReservationsModule { }
