import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { Child } from '../../models/child';
import { Tale } from '../../models/tale';
import { TaleService } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-tale',
  templateUrl: 'tale.html',
  providers: [ TaleService ]
})
/*
la prossima cosa da fare è rompere il processo di in-app purchase in fasi e capire come gestirle in termini di pagine/wait splash
e nel backend fare creare un endpoint per la conferma acquisto
*/
export class TalePage {

  tale: Tale;
  child: Child;
  taleReady: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              private taleService: TaleService) {

    const child = this.navParams.get('child')
    this.child = new Child(child.id, child.name, child.sex, child.child_features)
    this.tale =  this.navParams.get('tale')
    this.taleReady = false

    const env = this
    this.taleService.getTale(this.tale.id)
    .then((obj) => {
      // typescript... tale non è tales
      let tale = Object.assign(new Tale(), obj)
      tale.customizeTitle(this.child)
      tale.customizeScenes(this.child)
      env.tale = tale
      this.taleReady = true
    })
  }

  ngOnInit() {}

  startTale() {
    if (!this.taleReady) { return; }
    this.navCtrl.push('ScenePage', {
      tale: this.tale,
      child: this.child,
      sceneNumber: 1,
      featureString: this.child.featureString
    });
  }
}