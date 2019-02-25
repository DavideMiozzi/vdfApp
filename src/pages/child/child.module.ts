import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { ChildPage } from './child';

@NgModule({
  declarations: [
    ChildPage,
  ],
  imports: [
    IonicPageModule.forChild(ChildPage),
    TranslateModule
  ],
  exports: [
    ChildPage
  ]
})
export class ChildPageModule { }
