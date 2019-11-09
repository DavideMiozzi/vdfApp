import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Order } from '../../models/order';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private orderService: OrderService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

  ionViewWillEnter() {
    this.orderService.getOrders().then((orders) => { 
      console.log(orders);
      this.orders = orders; 
    });
  }

  private goToChildrenPage() { 
    event.stopPropagation();
    this.navCtrl.push('ChildrenPage', { });
  }
}
