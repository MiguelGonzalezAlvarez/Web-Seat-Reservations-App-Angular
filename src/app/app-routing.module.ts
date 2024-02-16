import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'seat-reservation-app',
    loadChildren: () => import('./reservations/reservations.module').then(module => module.ReservationsModule)
  },
  {
    path: '**',
    redirectTo: 'seat-reservation-app/reservations'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }