import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { share, finalize } from 'rxjs/operators';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { UserService } from './user.service';

import {
  SignInData,
  AuthData,
  RegisterData,
  FacebookLoginData,
  GoogleLoginData
} from '../models/auth';
import { User } from '../models/user';
import { Address } from '../models/address';

import * as Constants from '../constants';

@Injectable()

export class AuthService {
  readonly APIbaseUrl = Constants.API_ENDPOINT;

  private authData: AuthData;

  constructor(private http: HttpClient,
              private storage: Storage,
              private fb: Facebook,
              private gp: GooglePlus,
              private profile: UserService) {
    this.resetAuthData(); 
  }

  private resetAuthData() {
    this.authData = {
      accessToken:  null,
      client:       null,
      expiry:       null,
      tokenType:    null,
      uid:          null
    }
  }

  isLoggedIn(): Observable<any> {
    return this.getCurrentAuthData().map(data => (
      data.accessToken != null &&
      data.client != null &&
      data.expiry != null &&
      data.tokenType != null &&
      data.uid != null));
  }

  getCurrentAuthData(): Observable<AuthData> {
    if (
      this.authData.accessToken != null &&
      this.authData.client != null &&
      this.authData.expiry != null &&
      this.authData.tokenType != null &&
      this.authData.uid != null
    ) {
      return Observable.of(this.authData);
    } else {
      return Observable.fromPromise(this.getAuthDataFromStorage());
    }
  }

  facebookSignIn(): Promise<any> {
    let env = this;
    return env.fb.login(["public_profile", "email"])
    .then(
      (response) => {
        let userId = response.authResponse.userID;
        return env.fb.api("/me?fields=name,email", [])
        .then((userInfo) => {
          return {
              email: userInfo.email,
              name: userInfo.name,
              uid: userId
            }
          })
      })
    .then((facebookLoginData) => {
      return env.facebookSignInCallback(<FacebookLoginData>facebookLoginData)
    })
    .catch((error) => console.log(error));
  }

  googleSignIn(): Promise<any> {
    let env = this;
    return env.gp.login()
    .then(
      (response) => {
        return {
          email: response.email,
          name: response.givenName + ' ' + response.familyName,
          uid: response.userId
        };
      })
    .then((googleLoginData) => {
      return env.googleSignInCallback(<GoogleLoginData>googleLoginData)
    })
    .catch((error) => console.log(error));
  }

  private getAuthDataFromStorage() {
    const promises = [];
    const keys = ['accessToken', 'client', 'expiry', 'tokenType', 'uid'];

    keys.forEach(key => promises.push(this.storage.get(key)));

    return Promise.all(promises).then((values) =>{
      const result: AuthData = {
        accessToken:  null,
        client:       null,
        expiry:       null,
        tokenType:    null,
        uid:          null
      }

      values.map((value, index) => {
        result[keys[index]] = value;
      });

      this.setAuthData(result, false);

      return result;
    });
  }

  public getAuthHeadersFromResponse(data: any): void {
    const headers = data.headers;
    const authData: AuthData = {
      accessToken:  headers.get('access-token'),
      client:       headers.get('client'),
      expiry:       headers.get('expiry'),
      tokenType:    headers.get('token-type'),
      uid:          headers.get('uid')
    };
    this.setAuthData(authData, true);
  }

  private setAuthData(authData: AuthData, store: boolean) {
    if (this.checkAuthData(authData)) {
      this.authData = authData;
      if (store) {
        const promises = [];

        promises.push(this.storage.set('accessToken', authData.accessToken));
        promises.push(this.storage.set('client', authData.client));
        promises.push(this.storage.set('expiry', authData.expiry));
        promises.push(this.storage.set('tokenType', authData.tokenType));
        promises.push(this.storage.set('uid', authData.uid));

        Promise.all(promises).catch(error => console.log(error));
      }
    }
  }

  private checkAuthData(authData: AuthData): boolean {
    if (
      authData.accessToken != null &&
      authData.client != null &&
      authData.expiry != null &&
      authData.tokenType != null &&
      authData.uid != null
    ) {
      if (this.authData.accessToken != '') {
        return this.authData.accessToken != authData.accessToken && authData.expiry >= this.authData.expiry;
      } else {
        return true; // this.authData empty, parameter not
      }
    } else {
      return false; // some empty field
    }
  }

  registerAccount(registerData: RegisterData): Observable<any> {
    const body = {
      email: registerData.email,
      password: registerData.password,
      name: registerData.name,
      language: registerData.language
    };

    return this.http.post(this.APIbaseUrl + "auth", body).do((response) => { this.storeUser(response['data']); })
  }

  signOut(): Observable<any> {
    const observ = this.http.delete<any>(this.APIbaseUrl + "auth/sign_out").pipe(finalize(() => {
              const promises = [];

              promises.push(this.storage.remove('accessToken'));
              promises.push(this.storage.remove('client'));
              promises.push(this.storage.remove('expiry'));
              promises.push(this.storage.remove('tokenType'));
              promises.push(this.storage.remove('uid'));
              promises.push(this.storage.remove('user'));
              promises.push(this.removeChildrenFromStorage());

              Promise.all(promises).catch(error => console.log(error));

              this.resetAuthData();
            })
          );

    return observ;
  }

  private async removeChildrenFromStorage() {
    try {
      const keys = await this.storage.keys();
      const children_keys = keys.filter(key => key.startsWith('child_'));
      const promises = [];
      children_keys.forEach(child_key => promises.push(this.storage.remove(child_key)));
      return Promise.all(promises);
    }
    catch (error) {
      return console.log(error);
    }
  }

  signIn(signInData: SignInData): Observable<any> {

    const params = {
      email: signInData.email,
      password: signInData.password
    };

    return this.http.post(this.APIbaseUrl + "auth/sign_in", params, { observe: 'response' })
    .do(response => {
      this.storeUser(response.body['data']);
    })
    .pipe(share());
  }

  private storeUser(data) {
    let user = new User();
    user.id = data.id;
    user.email = data.email;
    user.language = data.language;
    user.name = data.name;
    data.addresses.forEach((address) => {
      user[address.address_type+"_address"] = new Address()
      user[address.address_type+"_address"].street = address.street
      user[address.address_type+"_address"].streetNumber = address.street_number
      user[address.address_type+"_address"].zipCode = address.zip_code
      user[address.address_type+"_address"].city = address.city
      user[address.address_type+"_address"].countryName = address.country_name 
    })
    this.profile.storeUser(user);
  }

  private facebookSignInCallback(facebookLoginData: FacebookLoginData) {
    const body = {
      provider: 'facebook',
      uid: facebookLoginData.uid,
      name: facebookLoginData.name,
      email: facebookLoginData.email,
    };
    return this.http.post(this.APIbaseUrl + "v1/omniauth/facebook/callback", body).do(response => {
      this.storeUser(response);
    }).toPromise();
  }

  private googleSignInCallback(googleLoginData: GoogleLoginData) {
    const body = {
      provider: 'google',
      uid: googleLoginData.uid,
      name: googleLoginData.name,
      email: googleLoginData.email,
    };
    return this.http.post(this.APIbaseUrl + "v1/omniauth/google/callback", body).do(response => {
      this.storeUser(response['id']);
    }).toPromise();
  }
}