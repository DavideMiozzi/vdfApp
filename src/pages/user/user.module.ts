import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { UserPage } from './user';

@NgModule({
  declarations: [
    UserPage,
  ],
  imports: [
    IonicPageModule.forChild(UserPage),
    TranslateModule
  ],
  exports: [
    UserPage
  ]
})
export class UserPageModule {}