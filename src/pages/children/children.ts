import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Child } from '../../models/child'
import { ChildService } from '../../providers';


@IonicPage()
@Component({
  selector: 'page-children',
  templateUrl: 'children.html',
  providers: [ ChildService ]
})

export class ChildrenPage {

  children: Child[];

  constructor(public navCtrl: NavController, private childService: ChildService) {}

  ionViewWillEnter() {
    this.childService.getChildren().then((children) => { 
      console.log(children);
      this.children = children; 
    });
  }

  goToChildPage(child) {
    this.navCtrl.push('ChildPage', { child: child.id });
  }

  addChild() {
    this.navCtrl.push('ChildPage', { child: 0 });
  }

}