import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TalePage } from './tale';

@NgModule({
  declarations: [
    TalePage,
  ],
  imports: [
    IonicPageModule.forChild(TalePage)
  ],
  exports: [
    TalePage
  ]
})

export class TalePageModule { }