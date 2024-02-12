import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'reservations',
    loadChildren: () => import('./reservations/reservations.module').then(module => module.ReservationsModule)
  },
  {
    path: '**',
    redirectTo: 'reservations'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }