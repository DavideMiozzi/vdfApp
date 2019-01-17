import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

import { RegisterData } from '../../models/auth';
import { AuthService } from '../../providers/auth.service';

@IonicPage()
@Component({
  selector: 'page-password-recovery',
  templateUrl: 'password-recovery.html'
})
export class RecoveryPage {

  recoveryForm = new FormGroup({
    email: new FormControl('')
  });

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private auth: AuthService) {}

  recover() {
    let loader = this.loadingCtrl.create();
    loader.present();
    console.log("TODO: recupera passord");
    loader.dismiss();
    // this.auth.registerAccount(<RegisterData>this.signupForm.value).subscribe(
    //   success => this.navCtrl.setRoot('ChildrenPage'),
    //   err => console.log("TODO: handle error in registration")
    // );
  }
}
