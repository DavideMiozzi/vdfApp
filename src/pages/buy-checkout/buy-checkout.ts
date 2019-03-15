import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BuyCheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-checkout',
  templateUrl: 'buy-checkout.html',
})
export class BuyCheckoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyCheckoutPage');
  }

  public gotoNextPage() {
    event.stopPropagation();
    this.navCtrl.push('BuySummaryPage');
  }

}
