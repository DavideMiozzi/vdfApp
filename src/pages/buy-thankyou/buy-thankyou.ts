import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BuyThankyouPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-thankyou',
  templateUrl: 'buy-thankyou.html',
})
export class BuyThankyouPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyThankyouPage');
  }

  public gotoNextPage() {
    event.stopPropagation();
    this.navCtrl.push('ChildrenPage');
  }

}
