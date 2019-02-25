import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { ChildrenPage } from './children';

@NgModule({
  declarations: [
    ChildrenPage,
  ],
  imports: [
    IonicPageModule.forChild(ChildrenPage),
    TranslateModule
  ],
  exports: [
    ChildrenPage
  ]
})
export class ChildrenPageModule {}