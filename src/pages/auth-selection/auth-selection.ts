import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';


import { SignInData } from '../../models/auth';
import { AuthService } from '../../providers/auth.service';

@IonicPage()
@Component({
  selector: 'page-auth-selection',
  templateUrl: 'auth-selection.html',
  providers: [AuthService]
})
export class AuthSelectionPage {

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController, 
              public alertCtrl: AlertController, 
              private auth: AuthService, 
              public translate:TranslateService) {}

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
    let loader = this.loadingCtrl.create();
    loader.present();
    this.auth.signIn(<SignInData>this.authenticationForm.value).subscribe(
      success => {
        loader.dismiss();
        this.navCtrl.setRoot('ChildrenPage');
      },
      err => {
        loader.dismiss();
        this.authGoneWrong();
      },
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