import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyCheckoutPage } from './buy-checkout';

@NgModule({
  declarations: [
    BuyCheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyCheckoutPage),
  ],
})
export class BuyCheckoutPageModule {}
