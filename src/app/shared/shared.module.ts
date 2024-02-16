import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    ShoppingCartComponent,
    ToolbarComponent,
    OrderByDatePipe
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  exports: [
    FlexLayoutModule,
    ShoppingCartComponent,
    ToolbarComponent,
    OrderByDatePipe
  ]
})
export class SharedModule { }
