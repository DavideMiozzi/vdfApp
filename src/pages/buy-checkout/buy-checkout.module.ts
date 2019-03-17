import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyCheckoutPage } from './buy-checkout';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BuyCheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyCheckoutPage),
    TranslateModule
  ],
})
export class BuyCheckoutPageModule {}
