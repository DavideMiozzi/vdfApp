import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { RecoveryPage } from './password-recovery';

@NgModule({
  declarations: [
    RecoveryPage,
  ],
  imports: [
    IonicPageModule.forChild(RecoveryPage)
  ],
  exports: [
    RecoveryPage
  ]
})
export class RecoveryPageModule { }
