import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { OrdersPage } from './orders';

@NgModule({
  declarations: [
    OrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdersPage),
    TranslateModule
  ],
})
export class OrdersPageModule {}
