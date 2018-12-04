import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, private auth: AuthService) {}

  register() {
    this.auth.registerAccount(<RegisterData>this.signupForm.value).subscribe(
      success => this.navCtrl.setRoot('ChildrenPage'),
      err => console.log("TODO: handle error in registration")
    );
  }
}
