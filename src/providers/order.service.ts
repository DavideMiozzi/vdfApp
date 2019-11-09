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

  getOrder(order_id): Promise<Order> {
    if (this.network.isConnected()) {
      return this.http.get<Order>(this.APIbaseUrl+`orders/${order_id}`)
      .toPromise()
      .then((orderFromServer) => this.storeOrder(orderFromServer))
    } else {
      return this.getOrderFromStorage()
      .then(() => this.storage.set("order_modified_offline", "true"))
    }
  }

  getOrders(): Promise<Order[]> {
    if (this.network.isConnected()) {
      return this.http.get<Order[]>(this.APIbaseUrl+`orders/index_by_user`)
      .toPromise()
      .then((ordersFromServer) => this.storeOrders(ordersFromServer))
    } else {
      return this.getOrdersFromStorage()
    }
  }

  confirmOrderPayment(order, paypal_result): Promise<any> {
    return this.http.post(this.APIbaseUrl+"orders/process_payment/"+ order.id, "")
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

  private getOrdersFromStorage(): Promise<Order[]> {
    return this.storage.get(`orders`)
    .then((orderData) => JSON.parse(orderData))
    .catch((error) => console.log('error retrieving order from storage', error))
  }

  private storeOrders(orders): Promise<Order[]> {
    return this.storage.set("order", JSON.stringify(orders))
    .then(()=> orders)
    .catch(error => console.log(error));
  }
}