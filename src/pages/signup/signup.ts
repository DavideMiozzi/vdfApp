import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

import { RegisterData } from '../../models/auth';
import { AuthService } from '../../providers/auth.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  signupForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private auth: AuthService) {}

  register() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.auth.registerAccount(<RegisterData>this.signupForm.value).subscribe(
      success => {
        loader.dismiss();
        this.navCtrl.setRoot('ChildrenPage');
      },
      err => {
        loader.dismiss();
        console.log("TODO: handle error in registration");
       }
    );
  }
}
