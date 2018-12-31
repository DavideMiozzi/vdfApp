import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';


import { SignInData } from '../../models/auth';
import { AuthService } from '../../providers/auth.service';

@IonicPage()
@Component({
  selector: 'page-auth-selection',
  templateUrl: 'auth-selection.html',
  providers: [AuthService]
})
export class AuthSelectionPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private auth: AuthService) {}

  goTo(page) {
    this.navCtrl.push(page);
  }

  authenticationForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

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

  authenticate() {
    this.auth.signIn(<SignInData>this.authenticationForm.value).subscribe(
      success => this.navCtrl.setRoot('ChildrenPage'),
      err => this.authGoneWrong()
    );
  }

  // authGoneWrong() {
  //   this.authenticationForm.reset();
  //   const alert = this.alertCtrl.create({
  //     title: 'Errore nell\'accesso',
  //     subTitle: 'Riprovare per continuare',
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

}