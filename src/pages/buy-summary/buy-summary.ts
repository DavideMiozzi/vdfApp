import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public translate:TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuySummaryPage');
  }
 
  goback() {
    this.navCtrl.pop();
  }

  public gotoNextPage() {
    event.stopPropagation();
    this.navCtrl.push('BuyThankyouPage');
  }

}
