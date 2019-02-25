import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { ScenePage } from './scene';

@NgModule({
  declarations: [
    ScenePage,
  ],
  imports: [
    IonicPageModule.forChild(ScenePage),
    TranslateModule
  ],
  exports: [
    ScenePage
  ]
})

export class ScenePageModule { }