import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Tale } from '../../models/tale';
import { Child } from '../../models/child';
import { Order } from '../../models/order';
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
  tale: Tale;
  child: Child;
  order: Order;
  result: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public translate:TranslateService) {
    this.tale = this.navParams.get('tale');
    this.child = this.navParams.get('child');
    this.order = this.navParams.get('order');
    this.result = this.navParams.get('result');
  }

  ionViewDidLoad() {
  }
 
  goback() {
    this.navCtrl.pop();
  }

  public gotoNextPage() {
    event.stopPropagation();
    this.navCtrl.push('ChildrenPage');
  }

}
