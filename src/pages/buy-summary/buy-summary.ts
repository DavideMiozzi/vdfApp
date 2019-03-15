import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuySummaryPage');
  }

  public gotoNextPage() {
    event.stopPropagation();
    this.navCtrl.push('BuyThankyouPage');
  }

}
