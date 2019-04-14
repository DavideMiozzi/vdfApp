import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { User } from '../../models/user';
import { Tale } from '../../models/tale';
import { Child } from '../../models/child';
import { Print } from '../../models/order'
import { Order } from '../../models/order'
import { OrderService, UserService } from '../../providers';
import { Address } from '../../models/address';

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
  user: User;
  child: Child;
  tale: Tale;
  order: Order;
  check_Spedizione: Boolean = false;
  updateDeliveryAddress: Boolean = false;
  orderAddress: Address;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public translate:TranslateService,
              private orderService: OrderService,
              private userService: UserService) {
    this.tale = this.navParams.get('tale');
    this.child = this.navParams.get('child');
    this.order = this.navParams.get('order');
    this.user = new User();
    this.user.billing_address = new Address();
    this.user.delivery_address = new Address();
    console.log(this.order);
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    let env = this;
    this.userService.getUser().subscribe((user) => {
      env.user = Object.assign(env.user, user);
    });
  }
 
  goback() {
    this.navCtrl.pop();
  }

  public gotoNextPage() {
    event.stopPropagation();
    if (this.updateDeliveryAddress) {
      // salva l'indirizzo di spedizione
      this.userService.updateUser(this.user).subscribe(() => {
        this.navCtrl.push('BuySummaryPage', { order: this.order, tale: this.tale, child: this.child });
      });
    } else {
      this.navCtrl.push('BuySummaryPage', { order: this.order, tale: this.tale, child: this.child });
    }
  }

  newDeliveryAddress() {
    this.updateDeliveryAddress = true;
  }

}
