import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Tale } from '../../models/tale';
import { Child } from '../../models/child';
import { Print } from '../../models/order'
import { Order } from '../../models/order'
import { OrderService } from '../../providers';


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
  tale: Tale;
  child: Child;
  inscription: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public translate:TranslateService,
              private orderService: OrderService) {
    this.tale = this.navParams.get('tale');
    this.child = this.navParams.get('child');
    this.inscription = "";
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
  
  public createOrder() {
    event.stopPropagation();
    console.log(this.tale);
    let order = new Order();
    let print = new Print(this.child.id, this.tale.id, this.inscription);
    order.prints.push(print);
    this.orderService.createOrder(order).then((order) => {
      this.navCtrl.push('BuyCheckoutPage', { order: order, tale: this.tale, child: this.child });
    })
  }
}
