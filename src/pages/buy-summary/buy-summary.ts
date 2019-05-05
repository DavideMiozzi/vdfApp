import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';

import { Tale } from '../../models/tale';
import { Child } from '../../models/child';

/**
 * Generated class for the BuySummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-summary',
  templateUrl: 'buy-summary.html',
})
export class BuySummaryPage {
  tale: Tale;
  child: Child;
  inscription: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public translate:TranslateService,
              public paypal: PayPal) {
    this.tale = this.navParams.get('tale');
    this.child = this.navParams.get('child');
    this.inscription = "";
    console.log(this.tale);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuySummaryPage');
  }
 
  goback() {
    this.navCtrl.pop();
  }

  public purchase() {
    event.stopPropagation();
    this.paypal.init({
      "PayPalEnvironmentProduction": "AdKYFhKNUGYqBRkUZQRZn4XVgPBBbfen-Vri8fONgB7k0z6pY4rHox1Dc9qrTNBnqOkStvia051r9NTD",
      "PayPalEnvironmentSandbox": "AdKYFhKNUGYqBRkUZQRZn4XVgPBBbfen-Vri8fONgB7k0z6pY4rHox1Dc9qrTNBnqOkStvia051r9NTD"
      })
    .then(onSuccess => {
        console.log("init success")
    })
    .catch(onError => {
        console.log("init failed", Error)
    });
  }

}
