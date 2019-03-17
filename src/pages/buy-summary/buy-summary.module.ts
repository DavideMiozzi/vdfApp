import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuySummaryPage } from './buy-summary';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BuySummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(BuySummaryPage),
    TranslateModule
  ],
})
export class BuySummaryPageModule {}
