import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrderByDatePipe } from './pipes/orderByDate.pipe';


@NgModule({
  declarations: [
    ShoppingCartComponent,
    ToolbarComponent,
    OrderByDatePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule
  ],
  exports: [
    ShoppingCartComponent,
    ToolbarComponent,
    FlexLayoutModule,
    OrderByDatePipe
  ]
})
export class SharedModule { }
