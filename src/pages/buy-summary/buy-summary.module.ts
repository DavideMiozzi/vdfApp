import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuySummaryPage } from './buy-summary';

@NgModule({
  declarations: [
    BuySummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(BuySummaryPage),
  ],
})
export class BuySummaryPageModule {}
