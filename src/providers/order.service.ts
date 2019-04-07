import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { NetworkService } from '../providers';

import { Order } from '../models/order';
import * as Constants from '../constants';


@Injectable()

export class OrderService {
  readonly APIbaseUrl = Constants.API_ENDPOINT_V;

  constructor(private http: HttpClient, private storage: Storage, private network: NetworkService) {}

  /* TODO
  
  getOrder(orderId): Promise<Order> {
  }

  deleteOrder(order): Promise<any> {
  }

  private deleteOrderFromStorage(order): Promise<Order> {
  }
*/

  updateOrder(order): Promise<any> {
    if (this.network.isConnected()) {
      return this.http.put<Order>(this.APIbaseUrl+`order/${order.id}`, order)
      .toPromise()
      .then(() => this.storeOrder(order))
    } else {
      this.storeOrder(order)
      .then(() => this.storage.set("order_modified_offline", "true"))
    }
  }

  createOrder(order): Promise<any> {
    return this.http.post(this.APIbaseUrl+"orders/", order)
      .toPromise()
      .then((orderFromServer) => this.storeOrder(orderFromServer))
  }

  async syncOrder(): Promise<Order> {
    // l'ordine nel telefono sovrascrive quello sul server
    const order = await this.getOrderFromStorage();
    this.updateOrder(order);

    this.storage.set("order_modified_offline", 'false');
    return order;
  }

  private getOrderFromStorage(): Promise<Order> {
    return this.storage.get(`order`)
    .then((orderData) => JSON.parse(orderData))
    .catch((error) => console.log('error retrieving order from storage', error))
  }

  private storeOrder(order): Promise<Order> {
    return this.storage.set("order", JSON.stringify(order))
    .then(()=> order)
    .catch(error => console.log(error));
  }
}