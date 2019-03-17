import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Tale } from '../../models/tale';
import { Child } from '../../models/child';

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
  dedica: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public translate:TranslateService) {
    this.tale = this.navParams.get('tale');
    this.child = this.navParams.get('child');
    this.dedica = "";
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
    console.log(this.tale);
    this.navCtrl.push('BuyCheckoutPage', { child: this.child, tale: this.tale });
  }

}
