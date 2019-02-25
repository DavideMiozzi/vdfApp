import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { AuthSelectionPage } from './auth-selection';

@NgModule({
  declarations: [
    AuthSelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthSelectionPage),
    TranslateModule
  ],
  exports: [
    AuthSelectionPage
  ]
})
export class AuthSelectionPageModule {}