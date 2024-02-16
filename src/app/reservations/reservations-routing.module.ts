import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationDetailScreenComponent } from './screens/reservation-detail-screen/reservation-detail-screen.component';
import { ReservationsScreenComponent } from './screens/reservations-screen/reservations-screen.component';

const routes: Routes = [
    {
        path: 'reservations',
        component: ReservationsScreenComponent,
    },
    {
        path: 'reservation-detail/:id',
        component: ReservationDetailScreenComponent,
    },
    {
        path: '**',
        redirectTo: 'reservations'
    }
]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class ReservationsRoutingModule { }
