import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MyApp } from './app.component';

import { FormatInterceptor } from '../providers/format.interceptor';
import { AuthInterceptor } from '../providers/auth.interceptor';

import {
        NetworkService,
        AuthService,
        UserService,
        ChildService,
        TaleService
      } from '../providers';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      scrollPadding: false,
      scrollAssist: false
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    NetworkService,
    AuthService,
    UserService,
    ChildService,
    TaleService,
    GooglePlus,
    Facebook,
    InAppPurchase2,
    ScreenOrientation,

    { provide: HTTP_INTERCEPTORS, useClass: FormatInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
