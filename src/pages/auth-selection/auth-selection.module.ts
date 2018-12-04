import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AuthSelectionPage } from './auth-selection';

@NgModule({
  declarations: [
    AuthSelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthSelectionPage)
  ],
  exports: [
    AuthSelectionPage
  ]
})
export class AuthSelectionPageModule {}