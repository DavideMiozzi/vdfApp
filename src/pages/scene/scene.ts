import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { TranslateService } from '@ngx-translate/core';

import { Tale } from '../../models/tale';
import { Child } from '../../models/child';
import { Scene } from '../../models/scene';

import * as Constants from '../../constants';

@IonicPage()
@Component({
  selector: 'page-scene',
  templateUrl: 'scene.html'
})

export class ScenePage {

  sceneNumber: number;
  tale: Tale;
  child: Child;
  featureString: string;
  scene: Scene;
  private screenOrientation: ScreenOrientation;
  /* pezza per evitare che venga sbloccato scorrendo tra una scena e l'altra */
  unlockOrientation: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              screenOrientation: ScreenOrientation,
              public translateService:TranslateService) {
    this.screenOrientation = screenOrientation;
    this.unlockOrientation = true;
    this.sceneNumber = this.navParams.get('sceneNumber');
    this.featureString = this.navParams.get('featureString');
    this.tale = this.navParams.get('tale');
    this.child = this.navParams.get('child');
    this.scene = this.tale.scenes.filter(scene => scene.number == this.sceneNumber)[0];
    console.log("Scene number:" + this.sceneNumber);
    console.log(this.tale);
    console.log(this.scene);
  }

  ionViewDidLoad() {
    if (!this.platform.is('mobileweb') && !this.platform.is('core')) {
      // force orientation to landscape
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
  }

  ionViewDidLeave() {
    if (!this.platform.is('mobileweb') && !this.platform.is('core') && this.unlockOrientation) { this.screenOrientation.unlock(); }
  }

  ngOnInit() {}

  swiped(event) {
    if (event.direction == 2 && this.sceneNumber < this.tale.scenes.length) {
      this.unlockOrientation = false;
      // da destra a sinistra -> scena successiva
      this.navCtrl.push('ScenePage', {
        tale: this.tale,
        sceneNumber: this.sceneNumber + 1,
        featureString: this.featureString
      });
    } else if (event.direction == 4 && this.sceneNumber > 1) {
      this.unlockOrientation = false;
      // da sinistra a destra-> scena precedente
      this.navCtrl.push('ScenePage', {
        tale: this.tale,
        sceneNumber: this.sceneNumber - 1,
        featureString: this.featureString
      });
    }
  }

  private sceneString(image_path): string {
    const stringId = this.tale.string_id
    const sceneId = "s" + ("00" + this.sceneNumber).slice(-3)
    return stringId + '/' + image_path + sceneId + '/' + stringId + '_' + sceneId
  }

  backgroundFile(): string {
    return Constants.IMAGES_LOCATION + this.sceneString(Constants.IMAGES_APP_PATH) + '_sfondo.jpg'
  }

  childFile(): string {
    return Constants.IMAGES_LOCATION + this.sceneString(Constants.IMAGES_APP_PATH) + '_' + this.featureString + '.png'
  }

  getSceneStyles(scene) {
    return scene.style;
  }

  buyTale() {
    event.stopPropagation();
    this.navCtrl.push('BuyAdd2cartPage', { tale: this.tale, child: this.child });
  }

  shareTale(event: Event, social_network) {
    console.log("condivido la storia con il mondo su "+social_network+"!!!!");
  }

  goToTalesPage() {
    event.stopPropagation();
    this.navCtrl.push('TalesPage', { child: this.child, tale:this.tale });
  }
}