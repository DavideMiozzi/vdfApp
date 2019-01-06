import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2';

import { Tale } from '../../models/tale';
import { TaleService } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-tales',
  templateUrl: 'tales.html',
  providers: [ TaleService ]
})
/*
la prossima cosa da fare è rompere il processo di in-app purchase in fasi e capire come gestirle in termini di pagine/wait splash
e nel backend fare creare un endpoint per la conferma acquisto
*/
export class TalesPage {
  tales: Tale[];
  loader;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private taleService: TaleService,
              private store: InAppPurchase2,
              public navParams: NavParams,
              public platform: Platform) {
    const env = this
    this.taleService.getTales()
    .then((tales) => {
      // typescript... tales non sono tales
      env.tales = []
      tales.filter(tale => tale.sex == env.navParams.get('child').sex)
      .forEach((obj) => {
        let tale = Object.assign(new Tale(), obj)
        tale.customizeTitle(env.navParams.get('child'))
        env.tales.push(tale)
      })
    })
  }

  private goToTalePage(event: Event, tale: Tale) {
    event.stopPropagation();
    if (!tale.available) { return; }
    this.navCtrl.push('TalePage', { tale: tale, child: this.navParams.get('child') });
  }

  private initTalePurchase(tale: Tale) {
    let productId;
    try {
      if (this.platform.is('ios')) {
        productId = tale.purchase_code_ios;
      } else {
        productId = tale.purchase_code_android;
      }

      // Register Product
      console.log('Registering Product ' + JSON.stringify(productId));
      this.store.verbosity = this.store.DEBUG;
      this.store.register({
        id: productId,
        alias: tale.title,
        type: this.store.NON_CONSUMABLE
      });

      // Handlers
      this.store.when(productId).approved( (product: IAPProduct) => {
        product.finish();
        this.taleService.talePurchased(tale);
        this.loader.dismiss();
      });

      this.store.when(productId).registered( (product: IAPProduct) => {
        console.log('Registered: ' + JSON.stringify(product));
      });

      this.store.when(productId).cancelled( (product) => {
        if (this.loader.isOverlay) {
          this.loader.dismiss();
          alert('Purchase was Cancelled');
        }
      });

      this.store.error( (err) => {
        this.loader.dismiss();
        alert('Store Error ' + JSON.stringify(err));
      });

      this.store.ready((status) => {
        console.log(JSON.stringify(this.store.get(productId)));
        console.log('Store is Ready: ' + JSON.stringify(status));
        console.log('Products: ' + JSON.stringify(this.store.products));
      });
  
      // Errors
      this.store.when(productId).error( (error) => {
        this.loader.dismiss();
        alert('An Error Occured' + JSON.stringify(error));
      });
      // Refresh Always
      console.log('Refresh Store');
      this.store.refresh();
    } catch (err) {
      console.log('Error On Store Issues' + JSON.stringify(err));
    }
  }

  purchaseTale(event: Event, tale) {
    event.stopPropagation();
    this.loader = this.loadingCtrl.create({ 
      content: 'Completing Transaction'
    });
    this.loader.present();

    // Check For Review Status
    if (!tale.purchase_code_android || !tale.purchase_code_ios) {
      alert('This product has not yet been approved for purchase. Please submit it for review.');
      this.loader.dismiss();
      return;
    }

    this.initTalePurchase(tale);

    if (!this.platform.is('cordova')) { return };

    let productId;

    if (this.platform.is('ios')) {
      productId = tale.purchase_code_ios;
    } else {
      productId = tale.purchase_code_android;
    }

    try {
      let product = this.store.get(productId);
      console.log('Product Info: ' + JSON.stringify(product));
      this.store.order(productId).then( () => {
        console.log('Purchase Succesfull');
        this.loader.dismiss();
      }).catch( () => {
        console.log('Error Ordering From Store');
        this.loader.dismiss();
      });
    } catch (err) {
      console.log('Error Ordering ' + JSON.stringify(err));
      this.loader.dismiss();
    }
  }
}