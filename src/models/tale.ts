import { Child } from './child'
import { Scene } from './scene'

export class Tale {
  id: number;
  title: string;
  description: string;
  sex: string;
  available: boolean;
  purchase_code_ios: string;
  purchase_code_android: string;
  download_price: number;
  printing_price: number;
  scenes: Scene[];

  customizeTitle(child: Child) {
    this.title = this.title.replace(/{{name}}/g, child.name)
  }

  customizeScenes(child: Child) {
    this.scenes.forEach(scene => scene.text = scene.text.replace(/{{name}}/g, child.name))
  }
}