import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { Tale } from '../../models/tale';
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
  featureString: string;
  scene: Scene;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform) {
    this.sceneNumber = this.navParams.get('sceneNumber');
    this.featureString = this.navParams.get('featureString');
    this.tale = this.navParams.get('tale');
    this.scene = this.tale.scenes.filter(scene => scene.number == this.sceneNumber)[0];
    console.log("Scene number:" + this.sceneNumber);

    /* prova css dinamico la stringa jSON andrebbe nel db con la scena */
    var stile = "{\"font-size\":\""+(4+this.sceneNumber+"vh\"}";
    console.log("stile:" + stile);
    this.scene.style = JSON.parse(stile);
    console.log(this.scene.style);
  }

  ngOnInit() {}

  swiped(event) {
    if (event.direction == 2 && this.sceneNumber < this.tale.scenes.length) {
      // da destra a sinistra -> scena successiva
      this.navCtrl.push('ScenePage', {
        tale: this.tale,
        sceneNumber: this.sceneNumber + 1,
        featureString: this.featureString
      });
    } else if (event.direction == 4 && this.sceneNumber > 1) {
      // da sinistra a destra-> scena precedente
      this.navCtrl.push('ScenePage', {
        tale: this.tale,
        sceneNumber: this.sceneNumber - 1,
        featureString: this.featureString
      });
    }
  }

  private sceneString(): string {
    const stringId = this.tale.string_id
    const sceneId = "s" + ("00" + this.sceneNumber).slice(-3)
    return stringId + '/' + sceneId + '/' + stringId + '_' + sceneId
  }

  backgroundFile(): string {
    return Constants.IMAGES_LOCATION + this.sceneString() + '_sfondo.png'
  }

  childFile(): string {
    return Constants.IMAGES_LOCATION + this.sceneString() + '_' + this.featureString + '.png'
  }

  getSceneStyles(scene) {
    return scene.style;
}

}