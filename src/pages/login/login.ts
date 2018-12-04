import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

import { SignInData } from '../../models/auth';
import { AuthService } from '../../providers/auth.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService]
})

export class LoginPage {

  authenticationForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private auth: AuthService) {}

  authenticate() {
    this.auth.signIn(<SignInData>this.authenticationForm.value).subscribe(
      success => this.navCtrl.setRoot('ChildrenPage'),
      err => this.authGoneWrong()
    );
  }

  authGoneWrong() {
    this.authenticationForm.reset();
    const alert = this.alertCtrl.create({
      title: 'Errore nell\'accesso',
      subTitle: 'Riprovare per continuare',
      buttons: ['OK']
    });
    alert.present();
  }
}