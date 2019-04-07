import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Tale } from '../../models/tale';
import { Child } from '../../models/child';
import { Print } from '../../models/order'
import { Order } from '../../models/order'
import { OrderService } from '../../providers';

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
  child: Child;
  tale: Tale;
  order: Order;
  check_Spedizione: Boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public translate:TranslateService,
              private orderService: OrderService) {
    this.tale = this.navParams.get('tale');
    this.child = this.navParams.get('child');
    this.order = this.navParams.get('order');
    console.log(this.order);
  }

  ionViewDidLoad() {
    /* ***************************************************** PEZZAAAAAAAAAAAA */
    /* ***************************************************** PEZZAAAAAAAAAAAA */
    this.tale.printing_price = 28.00;
    /* ***************************************************** PEZZAAAAAAAAAAAA */
    /* ***************************************************** PEZZAAAAAAAAAAAA */
  }
 
  goback() {
    this.navCtrl.pop();
  }

  public gotoNextPage() {
    event.stopPropagation();
    this.navCtrl.push('BuySummaryPage', { order: this.order, tale: this.tale, child: this.child });
  }

}
