import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { AuthService } from '../../providers/auth.service';

@IonicPage()
@Component({
  selector: 'page-auth-selection',
  templateUrl: 'auth-selection.html'
})
export class AuthSelectionPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private auth: AuthService) {}

  goTo(page) {
    this.navCtrl.push(page);
  }

  facebookLogin() {
    console.log('TODO: facebookLogin');
  }

  authGoneWrong() {
    const alert = this.alertCtrl.create({
      title: 'Errore nell\'accesso',
      subTitle: 'Riprovare per continuare',
      buttons: ['OK']
    });
    alert.present();
  }

  googleLogin() {
    console.log('TODO: googleLogin');
  }
}