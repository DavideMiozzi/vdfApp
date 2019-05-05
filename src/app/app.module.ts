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
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PayPal } from '@ionic-native/paypal';
// import { Geolocation } from '@ionic-native/geolocation';
// import { GeolocationMock } from '@ionic-native-mocks/geolocation';

import { MyApp } from './app.component';

import { FormatInterceptor } from '../providers/format.interceptor';
import { AuthInterceptor } from '../providers/auth.interceptor';

import {
        NetworkService,
        AuthService,
        UserService,
        ChildService,
        TaleService,
        OrderService
      } from '../providers';

export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader),
        deps: [HttpClient]
      }
    })
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
    OrderService,
    GooglePlus,
    Facebook,
    InAppPurchase2,
    ScreenOrientation,
    PayPal,
    // { provide: Geolocation, useClass: GeolocationMock },
    { provide: HTTP_INTERCEPTORS, useClass: FormatInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],

  exports: [ TranslateModule]
})
export class AppModule {}
