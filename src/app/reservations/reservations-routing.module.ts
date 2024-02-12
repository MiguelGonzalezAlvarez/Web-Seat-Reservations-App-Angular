import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionScreenComponent } from './pages/session-screen/session-screen.component';
import { CatalogScreenComponent } from './pages/catalog-screen/catalog-screen.component';

const routes: Routes = [
    {
        path: 'catalog',
        component: CatalogScreenComponent,
    },
    {
        path: 'detail/:id',
        component: SessionScreenComponent,
    },
    {
        path: '**',
        redirectTo: 'catalog'
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
