import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BuyAdd2cartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-add2cart',
  templateUrl: 'buy-add2cart.html',
})
export class BuyAdd2cartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyAdd2cartPage');
  }

  public gotoNextPage() {
    event.stopPropagation();
    this.navCtrl.push('BuyCheckoutPage');
  }

}
