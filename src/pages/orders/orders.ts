import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Order, Product } from '../../models/order';
import { Tale } from '../../models/tale';
import { OrderService } from '../../providers';


/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  orders: Order[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private orderService: OrderService, 
              public translate:TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

  ionViewWillEnter() {
    const env = this;
    env.orders = []; 
    this.orderService.getOrders().then((orders) => { 
      console.log(orders);
      orders.forEach((obj) => {
        let order = Object.assign(new Order(), obj);
        order.products.forEach((product) => {
          product = Object.assign(new Product(), product);
          // product.print.tale = Object.assign(new Tale(), product.print.tale);
          product.customize();
        });
        env.orders.unshift(order);
      });
      console.log(env.orders);
    });
  }

  private goToChildrenPage() { 
    event.stopPropagation();
    this.navCtrl.push('ChildrenPage', { });
  }
}
