import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { PayPal, PayPalPayment, PayPalConfiguration, PayPalItem } from '@ionic-native/paypal';

import { Tale } from '../../models/tale';
import { Child } from '../../models/child';

/**
 * Generated class for the BuySummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-summary',
  templateUrl: 'buy-summary.html',
})
export class BuySummaryPage {
  tale: Tale;
  child: Child;
  inscription: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public translate:TranslateService,
              public paypal: PayPal) {
    this.tale = this.navParams.get('tale');
    this.child = this.navParams.get('child');
    this.inscription = "";
    console.log(this.tale);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuySummaryPage');
  }
 
  goback() {
    this.navCtrl.pop();
  }

  public purchase() {
    event.stopPropagation();

    /* TODO */
    /*
      Prima di effettuare il pagamento vero e proprio, salverei l'ordine sul nostro backend in stato "in attesa di pagamento",
      così l'id dell'ordine lo passiamo a paypal e teniamo una corrispondenza tra l'ordine e il pagamento, questo per eventuali
      verifiche, rimborsi e rogne varie. (non so se l'hai salvato già prima, non ho guardato)
      con i dati dell'ordine a questo punto possiamo procedere al pagmaento.

      alla risposta di paypal, cambio lo stato dell'ordine in "pagato", "errore pagamento" con dettagli.

      al cambio di stato dell'ordine, faccio 2 parole col pier e ti dico per quali, parte una mail al cliente che notifica ilc cambio stato
      al cambio stato in "pagato" parte una mail a noi con i dati per la stampa (dati spedizione, fatturazione e pdf del libro)
    */

    this.paypal.init({
      "PayPalEnvironmentProduction": "AdKYFhKNUGYqBRkUZQRZn4XVgPBBbfen-Vri8fONgB7k0z6pY4rHox1Dc9qrTNBnqOkStvia051r9NTD",
      "PayPalEnvironmentSandbox": "AdKYFhKNUGYqBRkUZQRZn4XVgPBBbfen-Vri8fONgB7k0z6pY4rHox1Dc9qrTNBnqOkStvia051r9NTD"
    })
    .then(onSuccess => {
      console.log("init success");
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.paypal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.tale.printing_price.toString(), 'EUR', 'TESTO DESCRIZIONE ACQUISTO', 'sale');
        payment.invoiceNumber = "NUMERO DEL NOSTRO ORDINE";
        payment.softDescriptor = "descrizione che compare sul movimento della carta di credito dell'acquirente max 22 caratteri";
        this.paypal.renderSinglePaymentUI(payment).then(() => {
          // Successfully paid
          console.log("venduto, vado alla pagine thankyou");

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    })
    .catch(onError => {
        console.log("init failed", Error)
    });
  }

}
