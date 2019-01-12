import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { NetworkService, AuthService } from '../providers';
import { AuthSelectionPage } from '../pages/auth-selection/auth-selection';

@Component({
  templateUrl: 'app.html',
  providers: [ AuthService ]
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              network: NetworkService,
              private authService: AuthService,
              private storage: Storage
              ) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();

      if (network.isConnected()) {
        this.authService.isLoggedIn().subscribe((loggedIn) => { this.rootPage = loggedIn ? 'ChildrenPage' : 'AuthSelectionPage'; });
      } else {
        this.lookForAuthInStorage();
      }

//     this.storage.clear().then(() => { console.log('cleared storage') });
    });
  }

  lookForAuthInStorage() {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      // se non c'è traccia di login e non siamo connessi: messaggio di errore
      // se qualcuno era connesso: vai alla pagina bambini
      this.rootPage = loggedIn ? 'ChildrenPage' : 'ErrorPage';
    });
  }

  openPage(page) {
    this.nav.push(page);
  }

  logout() {
    this.authService.signOut().subscribe(() => {
      this.nav.push("AuthSelectionPage");
      // this.nav.setRoot(AuthSelectionPage);
    });
  }
}

