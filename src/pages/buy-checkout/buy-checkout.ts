import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Tale } from '../../models/tale';
import { Child } from '../../models/child';

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
  tale: Tale;
  child: Child;
  dedica: string;
  check_Spedizione: Boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public translate:TranslateService) {
    this.tale = this.navParams.get('tale');
    this.child = this.navParams.get('child');
    this.dedica = "";
    console.log(this.tale);
  }

  ionViewDidLoad() {
    /* ***************************************************** PEZZAAAAAAAAAAAA */
    /* ***************************************************** PEZZAAAAAAAAAAAA */
    this.tale.printing_price = 28.00;
    this.dedica = "Dedicato a te, bello libro, bella favola, leggi.";
    /* ***************************************************** PEZZAAAAAAAAAAAA */
    /* ***************************************************** PEZZAAAAAAAAAAAA */
  }
 
  goback() {
    this.navCtrl.pop();
  }

  public gotoNextPage() {
    event.stopPropagation();
    this.navCtrl.push('BuySummaryPage', { child: this.child, tale: this.tale });
  }

}
