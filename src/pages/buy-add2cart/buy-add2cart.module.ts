import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyAdd2cartPage } from './buy-add2cart';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BuyAdd2cartPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyAdd2cartPage),
    TranslateModule
  ],
})
export class BuyAdd2cartPageModule {}
