import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';

import { NetworkService } from '../providers';

import { User } from '../models/user';

@Injectable()

export class UserService {
  readonly APIbaseUrl = 'http://localhost:3000/v1/';

  constructor(private http: HttpClient, private storage: Storage, private network: NetworkService) {}

  getUser(): Observable<User> {
    return Observable.fromPromise(this.storage.get("user").then((data) => JSON.parse(data)));
  }

  async storeUser(user: User) {
    try {
      const modified = await this.storage.get("user_modified_offline");
      if (modified == "true") {
        this.syncUser();
      } else {
        const value = await this.storage.set("user", JSON.stringify(user));
        console.log("saved:");
        console.log(value);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  updateUser(user): Observable<any> {
    if (this.network.isConnected()) {
      const userParams = this.userParams(user);
      return Observable.forkJoin(
        Observable.fromPromise(
          this.storage.set("user_modified_offline", "false")
          .then(() => this.storeUser(user))
          ),
          this.http.put(this.APIbaseUrl+`users/${user.id}`, userParams)
      );
    } else {
      return Observable.fromPromise(
        this.storage.set("user_modified_offline", "true")
        .then(() => this.storage.set("user", JSON.stringify(user)))
      );
    }
  }

  async syncUser() {
    try {
      const user = await this.storage.get("user");
      const userParams = this.userParams(user);
      await this.http.put(this.APIbaseUrl+`users/${user.id}`, userParams);
      await this.storage.set("user_modified_offline", 'false');
      console.log('user synced')
    } catch (error) {
      console.log(error);
    }
  }

  private userParams(user: User) {
    return {
      user: {
        email: user.email,
        language: user.language,
        name: user.name,
        addresses: [{
          address_type: 'billing',
          street_number: user.billing_address.streetNumber,
          street: user.billing_address.street,
          city: user.billing_address.city,
          zip_code: user.billing_address.zipCode,
          country_name: user.billing_address.countryName
        }]
      }
    }
  }
}
