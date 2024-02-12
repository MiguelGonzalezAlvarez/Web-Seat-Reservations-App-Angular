import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogScreenComponent } from './pages/catalog-screen/catalog-screen.component';
import { SessionScreenComponent } from './pages/session-screen/session-screen.component';
import { CatalogCardComponent } from './components/catalog-card/catalog-card.component';
import { ReservationsRoutingModule } from './reservations-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SessionItemComponent } from './components/session-item/session-item.component';
import { SessionListComponent } from './components/session-list/session-list.component';
import { CatalogListComponent } from './components/catalog-list/catalog-list.component';


@NgModule({
  declarations: [
    CatalogScreenComponent,
    SessionScreenComponent,
    CatalogCardComponent,
    SessionItemComponent,
    SessionListComponent,
    CatalogListComponent
  ],
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    SharedModule
  ]
})
export class ReservationsModule { }
