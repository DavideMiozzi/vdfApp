import { Child } from './child'
import { Scene } from './scene'

import * as Constants from '../constants';

export class Tale {
  id: number;
  string_id: string;
  title: string;
  description: string;
  sex: string;
  available: boolean;
  purchase_code_ios: string;
  purchase_code_android: string;
  download_price: number;
  printing_price: number;
  scenes: Scene[];
  preview_image: string;

  customizeTitle(child: Child) {
    this.title = this.title.replace(/{{name}}/g, child.name);
    this.preview_image = Constants.IMAGES_LOCATION + this.string_id + '/' + Constants.IMAGES_PREVIEW_PATH + this.string_id + '_' + child.features_string + '.jpg'
  }

  customizeScenes(child: Child) {

    this.scenes.forEach(scene => scene.text = scene.text.replace(/{{name}}/g, child.name))
    let feat = child.child_features.filter(feature => feature.feature == 'grandPaName')[0]
    let val = ""
    if (feat) {
      val = child.child_features.filter(feature => feature.feature == 'grandPaName')[0].value
    }
    this.scenes.forEach(scene => scene.text = scene.text.replace(/{{grandPaName}}/g, val))

    feat = child.child_features.filter(feature => feature.feature == 'grandMaName')[0]
    if (feat) {
      val = child.child_features.filter(feature => feature.feature == 'grandMaName')[0].value
    } else {
      val = ""
    }
    this.scenes.forEach(scene => scene.text = scene.text.replace(/{{grandMaName}}/g, val))

    feat = child.child_features.filter(feature => feature.feature == 'dadName')[0]
    if (feat) {
      val = child.child_features.filter(feature => feature.feature == 'dadName')[0].value
    } else {
      val = ""
    }
    this.scenes.forEach(scene => scene.text = scene.text.replace(/{{dadName}}/g, val))

    feat = child.child_features.filter(feature => feature.feature == 'momName')[0]
    if (feat) {
      val = child.child_features.filter(feature => feature.feature == 'momName')[0].value
    } else {
      val = ""
    }
    this.scenes.forEach(scene => scene.text = scene.text.replace(/{{momName}}/g, val))

    feat = child.child_features.filter(feature => feature.feature == 'bestFriendName')[0]
    if (feat) {
      val = child.child_features.filter(feature => feature.feature == 'bestFriendName')[0].value
    } else {
      val = ""
    }
    this.scenes.forEach(scene => scene.text = scene.text.replace(/{{bestFriendName}}/g, val))

    feat = child.child_features.filter(feature => feature.feature == 'dogName')[0]
    if (feat) {
      val = child.child_features.filter(feature => feature.feature == 'dogName')[0].value
    } else {
      val = "Bobo"
    }
    this.scenes.forEach(scene => scene.text = scene.text.replace(/{{dogName}}/g, val))
  }
}