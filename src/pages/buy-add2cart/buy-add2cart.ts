import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Tale } from '../../models/tale';
import { Child } from '../../models/child';
import { Print } from '../../models/order';
import { Order } from '../../models/order';
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
  }
 
  goback() {
    this.navCtrl.pop();
  }
  
  public createOrder() {
    event.stopPropagation();
    let local_order = new Order();
    let print = new Print(this.child.id, this.tale.id, this.inscription);
    local_order.prints.push(print);
    this.orderService.createOrder(local_order).then((order) => {
      /* MEGALOPEZZ */
      /* MEGALOPEZZA - è meglio se l'ordine che mi restituisce il server contenga tutti i suoi dati. e che le proprità si chiamino come la classe locale *
      for (let i = 0; i < order.products.length; i++) {
        // const product = order.products[i];
        order.products[i].child_id = local_order.prints[i].child_id;
        order.products[i].tale_id = local_order.prints[i].tale_id;
        order.products[i].inscription = local_order.prints[i].inscription;
      }
      /* MEGALOPEZZ */
      /* MEGALOPEZZ */
      this.navCtrl.push('BuyCheckoutPage', { order: order, tale: this.tale, child: this.child });
      // var tale = order.products[0].print.tale;
      // var child = order.products[0].print.child;
      // this.navCtrl.push('BuyCheckoutPage', { order: order });
    });
  }
}
