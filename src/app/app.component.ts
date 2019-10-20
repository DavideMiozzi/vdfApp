import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
// import { Globalization } from '@ionic-native/globalization/ngx';

import { NetworkService, AuthService, UserService } from '../providers';
import { AuthSelectionPage } from '../pages/auth-selection/auth-selection';

import { User } from '../models/user';

@Component({
  templateUrl: 'app.html',
  providers: [ AuthService, UserService ]
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  user: User;
  userName: string;


  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              network: NetworkService,
              private authService: AuthService,
              private storage: Storage, 
              translate: TranslateService,
              private userService: UserService,
              // private globalization: Globalization
              ) {
    // this.globalization.getPreferredLanguage()
    // .then(res => {console.log(res); console.log("uno");} )
    // .catch(e => console.log(e) );
    translate.setDefaultLang('it');

    let env = this;
    
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
      env.userName = "";

      if (network.isConnected()) {
        this.authService.isLoggedIn().subscribe((loggedIn) => { this.rootPage = loggedIn ? 'ChildrenPage' : 'AuthSelectionPage'; });
        this.userService.getUser().subscribe((user) => {
          env.userName = user.name;
        });
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
      // this.nav.push("AuthSelectionPage");
      this.nav.setRoot(AuthSelectionPage);
    });
  }
}

