import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyThankyouPage } from './buy-thankyou';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BuyThankyouPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyThankyouPage),
    TranslateModule
  ],
})
export class BuyThankyouPageModule {}
