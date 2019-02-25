import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Select } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { ToastController } from 'ionic-angular';

import { User } from '../../models/user'
import { Address } from '../../models/address'
import { UserService, AuthService } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
  providers: [ UserService ]
})

export class UserPage {

  user: User
  showSave: boolean

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private toastCtrl: ToastController, 
    public translate:TranslateService) {
      this.user = new User
      this.user.name = ""
      this.user.billing_address = new Address
      this.user.billing_address.city = ""
      this.user.billing_address.countryName = ""
      this.user.billing_address.street = ""
      this.user.billing_address.streetNumber = ""
      this.user.billing_address.zipCode = ""
    }

  ngOnInit() {
    let env = this;
    this.showSave = false;
    this.userService.getUser().subscribe((user) => {
      env.user = Object.assign(env.user, user);
    });
  }

  private showSavedToast() {
    let toast = this.toastCtrl.create({
        message: 'Saved',
        duration: 2000,
        position: 'bottom'
      });

    toast.present();
  }

  private saveUser() {
    this.userService.updateUser(this.user).subscribe((saved) => {
      this.showSavedToast();
      this.showSave = false;
    });
  }

  private goToChildrenPage() { 
    event.stopPropagation();
    this.navCtrl.push('ChildrenPage', { });
  }
}