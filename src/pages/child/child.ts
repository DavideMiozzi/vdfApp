import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Select } from 'ionic-angular';

import { ToastController } from 'ionic-angular';

import { Child } from '../../models/child'
import { ChildFeature } from '../../models/child_feature'
import { ChildService } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-child',
  templateUrl: 'child.html',
  providers: [ ChildService ]
})

export class ChildPage {
  child: Child;
  features: ChildFeature[];
  showSave: boolean;
  avatarFileName: string;

  @ViewChild('hairShapeSelect') hairShapeSelectRef: Select;
  @ViewChild('hairColorSelect') hairColorSelectRef: Select;
  @ViewChild('skinColorSelect') skinColorSelectRef: Select;
  @ViewChild('eyeColorSelect') eyeColorSelectRef: Select;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private childService: ChildService,
              private toastCtrl: ToastController) {
    this.showSave = false;
    this.features = new Array(
      new ChildFeature('hairShape', 'co'),
      new ChildFeature('hairColor', 'bi'),
      new ChildFeature('skinColor', 'bi'),
      new ChildFeature('eyeColor', 'az')
    );
    this.child = new Child(this.navParams.get('child'), '', 'boy', this.features);
    this.avatarFileName = 'avatar_m_o_az_c_cobi_p_ro';
  }
  
  ngOnInit() {
    if (this.navParams.get('child') != 0) {
      this.childService.getChild(this.navParams.get('child')).then((child) => {
        this.child.id = child.id;
        this.child.name = child.name;
        this.child.sex = child.sex;
        this.child.child_features = child.child_features;
        this.updateAvatar();
      });
    }
  }

  ionViewWillLeave() {
    (this.child.id == 0) && this.createChild();
  }
  
  private saveChild() {
    (this.child.id == 0) ? this.createChild() : this.updateChild();
  }

  private createChild() {
    this.childService.createChild(this.child)
    .then((child) => {
      this.child.id = child.id;
      this.showSavedToast();
      this.updateAvatar();
      this.showSave = false;
    });
  }

  private updateChild() {
    this.childService.updateChild(this.child)
    .then(() => {
      this.showSavedToast();
      this.updateAvatar();
      this.showSave = false;
    });
  }

  private showSavedToast() {
    let toast = this.toastCtrl.create({
        message: 'Salvato',
        duration: 2000,
        position: 'bottom'
      });

    toast.present();
  }

  private updateAvatar() {
    this.avatarFileName = "avatar_" + this.child.featureString;
  }

  goToChildrenPage() { this.navCtrl.pop(); }

  goToTalesPage() {
    this.navCtrl.push('TalesPage', { child: this.child });
  }

  setSex(sex) {
    if (this.child.sex != sex) {
      this.child.sex = sex;
      this.saveChild();
    }
  }

  openHairShapeSelect() { this.hairShapeSelectRef.open(); }
  openHairColorSelect() { this.hairColorSelectRef.open(); }
  openSkinColorSelect() { this.skinColorSelectRef.open(); }
  openEyeColorSelect()  { this.eyeColorSelectRef.open(); }
}