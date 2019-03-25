import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Select, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

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
  dadName: string;
  momName: string;
  bestFriendName: string;
  dogName: string;
  grandPaName: string;
  grandMaName: string;
  birthday: string;

  @ViewChild('hairShapeSelect') hairShapeSelectRef: Select;
  @ViewChild('hairColorSelect') hairColorSelectRef: Select;
  @ViewChild('skinColorSelect') skinColorSelectRef: Select;
  @ViewChild('eyeColorSelect') eyeColorSelectRef: Select;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private childService: ChildService,
              private toastCtrl: ToastController, 
              public translate:TranslateService,
              public alertCtrl: AlertController) {
    this.showSave = false;
    this.features = new Array(
      new ChildFeature('hairShape', 'co'),
      new ChildFeature('hairColor', 'bi'),
      new ChildFeature('skinColor', 'bi'),
      new ChildFeature('eyeColor', 'az'),
      new ChildFeature('dadName', 'papà'),
      new ChildFeature('momName', 'mamma'),
      new ChildFeature('bestFriendName', "l'amico del cuore"),
      new ChildFeature('dogName', 'Fido'),
      new ChildFeature('grandMaName', 'nonna'),
      new ChildFeature('grandPaName', 'nonno'),
      new ChildFeature('birthday', ''),
    );
    const child = this.navParams.get('child');
    if (child == 0) {
      console.log("nuovo");
      this.child = Child.getRandomChild();
    } else {
      this.child = new Child(child.id, child.name, child.sex, child.child_features);
    }

    this.dadName = "papà"
    if (this.child.child_features.filter(feature => feature.feature == 'dadName')[0] != null)
    {
      this.dadName = this.child.child_features.filter(feature => feature.feature == 'dadName')[0].value
    }

    this.momName = "mamma"
    if (this.child.child_features.filter(feature => feature.feature == 'momName')[0] != null)
    {
      this.momName = this.child.child_features.filter(feature => feature.feature == 'momName')[0].value
    }

    this.bestFriendName = "l'amico del cuore"
    if (this.child.child_features.filter(feature => feature.feature == 'bestFriendName')[0] != null)
    {
      this.bestFriendName = this.child.child_features.filter(feature => feature.feature == 'bestFriendName')[0].value
    }

    this.dogName = "il mio cane"
    if (this.child.child_features.filter(feature => feature.feature == 'dogName')[0] != null)
    {
      this.dogName = this.child.child_features.filter(feature => feature.feature == 'dogName')[0].value
    }

    this.grandMaName = "nonna"
    if (this.child.child_features.filter(feature => feature.feature == 'grandMaName')[0] != null)
    {
      this.grandMaName = this.child.child_features.filter(feature => feature.feature == 'grandMaName')[0].value
    }

    this.grandPaName = "nonno"
    if (this.child.child_features.filter(feature => feature.feature == 'grandPaName')[0] != null)
    {
      this.grandPaName = this.child.child_features.filter(feature => feature.feature == 'grandPaName')[0].value
    }

    this.birthday = ""
    if (this.child.child_features.filter(feature => feature.feature == 'birthday')[0] != null)
    {
      this.birthday = this.child.child_features.filter(feature => feature.feature == 'birthday')[0].value
    }


    // translate.get('HELLO').subscribe(
    //   value => {
    //     alert(value);
    //   }
    // )

    this.updateAvatar();
  }
  
  ngOnInit() {
    if (this.child.id != 0) {
      this.childService.getChild(this.child.id).then((child) => {
        this.child = child;
        console.log("OOO");
        console.log(child);
        // this.child.id = child.id;
        // this.child.name = child.name;
        // this.child.sex = child.sex;
        // this.child.child_features = child.child_features;
        // this.updateAvatar();
      });
    }
  }

  ionViewWillLeave() {
    (this.child.id == 0) && this.createChild();
  }
  
  private saveChild() {
    if (this.child.child_features.filter(feature => feature.feature == 'dadName')[0] != null)
    {
      this.child.child_features.filter(feature => feature.feature == 'dadName')[0].value = this.dadName
    } else {
      let newFeat = new ChildFeature('dadName', this.dadName)
      this.child.child_features.push(newFeat)
    }

    if (this.child.child_features.filter(feature => feature.feature == 'momName')[0] != null)
    {
      this.child.child_features.filter(feature => feature.feature == 'momName')[0].value = this.momName
    } else {
      let newFeat = new ChildFeature('momName', this.momName)
      this.child.child_features.push(newFeat)
    }

    if (this.child.child_features.filter(feature => feature.feature == 'bestFriendName')[0] != null)
    {
      this.child.child_features.filter(feature => feature.feature == 'bestFriendName')[0].value = this.bestFriendName
    } else {
      let newFeat = new ChildFeature('bestFriendName', this.bestFriendName)
      this.child.child_features.push(newFeat)
    }

    if (this.child.child_features.filter(feature => feature.feature == 'dogName')[0] != null)
    {
      this.child.child_features.filter(feature => feature.feature == 'dogName')[0].value = this.dogName
    } else {
      let newFeat = new ChildFeature('dogName', this.dogName)
      this.child.child_features.push(newFeat)
    }

    if (this.child.child_features.filter(feature => feature.feature == 'grandMaName')[0] != null)
    {
      this.child.child_features.filter(feature => feature.feature == 'grandMaName')[0].value = this.grandMaName
    } else {
      let newFeat = new ChildFeature('grandMaName', this.grandMaName)
      this.child.child_features.push(newFeat)
    }

    if (this.child.child_features.filter(feature => feature.feature == 'grandPaName')[0] != null)
    {
      this.child.child_features.filter(feature => feature.feature == 'grandPaName')[0].value = this.grandPaName
    } else {
      let newFeat = new ChildFeature('grandPaName', this.grandPaName)
      this.child.child_features.push(newFeat)
    }

    if (this.child.child_features.filter(feature => feature.feature == 'birthday')[0] != null)
    {
      this.child.child_features.filter(feature => feature.feature == 'birthday')[0].value = this.birthday
    } else {
      let newFeat = new ChildFeature('birthday', this.birthday)
      this.child.child_features.push(newFeat)
    }

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

  private goToChildrenPage() { 
    event.stopPropagation();
    this.navCtrl.push('ChildrenPage', { child: this.child });
  }

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

  deleteChild() {
    const confirm = this.alertCtrl.create({
      title: 'Cancellare il bocia?',
      message: 'Sei sicuro di voler cancellare il bocchia: "'+this.child.name+'"?',
      buttons: [
        {
          text: 'No dai, ci ripenso!',
          handler: () => {
            console.log('NO, non salvare');
          }
        },
        {
          text: 'Vai, eliminalo!!!',
          handler: () => {
            console.log('OK, cancella il bocia');
            let env = this
            this.childService.deleteChild(this.child).then(() => env.navCtrl.push('ChildrenPage'))
          }
        }
      ]
    });
    confirm.present();
  }
  
  newValue() {
    this.showSave = (this.child.name.length != 0)&&(this.birthday.length != 0)
  }
}