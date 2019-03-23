import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { NetworkService } from '../providers';

import { Child } from '../models/child';
import * as Constants from '../constants';


@Injectable()

export class ChildService {
  readonly APIbaseUrl = Constants.API_ENDPOINT_V;

  constructor(private http: HttpClient, private storage: Storage, private network: NetworkService) {}

  getChildren(): Promise<Child[]> {
    if (this.network.isConnected()) { 
        return this.storage.get("children_modified_offline")
        .then((modified) => {
          if (modified === 'true') {
            return this.syncChildren()
          } else {
            return this.http.get<Child[]>(this.APIbaseUrl+"children/")
            .pipe(
              tap((children) => this.storeChildren(children))
            )
            .toPromise()
            .then((children) => {
              this.storage.set("children_modified_offline", "false")
              return children
            })
          }
        })
    } else {
      return this.getChildrenFromStorage();
    }
  }

  getChild(childId): Promise<Child> {
    if (this.network.isConnected()) {
      // children_modified_offline è già stato controllato prima
      return this.http.get<Child>(this.APIbaseUrl+`children/${childId}`)
      .toPromise()
      .then((child) => {
        this.storeChild(child)
        return child
      })
    } else {
      return this.getChildFromStorage(childId);
    }
  }

  updateChild(child): Promise<any> {
    if (this.network.isConnected()) {
      return this.http.put<Child>(this.APIbaseUrl+`children/${child.id}`, child)
      .toPromise()
      .then(() => this.storeChild(child))
    } else {
      this.storeChild(child)
      .then(() => this.storage.set("children_modified_offline", "true"))
    }
  }

  deleteChild(child): Promise<any> {
    if (this.network.isConnected()) {
      return this.http.delete<Child>(this.APIbaseUrl+`children/${child.id}`)
      .toPromise()
      .then(() => this.deleteChildFromStorage(child))
    } else {
      this.deleteChildFromStorage(child)
      .then(() => this.storage.set("children_modified_offline", "true"))
    }
  }

  createChild(child): Promise<any> {
    // non si può creare un bambino offline, perchè abbiamo bisogno di un id
    // TODO: assegnare un id negativo, poi durante il sync separare i bambini aggiornati da quelli creati ed eseguire due azioni distinte
    return this.http.post(this.APIbaseUrl+"children/", child)
      .toPromise()
      .then((childFromServer) => this.storeChild(childFromServer))
  }

  private getChildrenFromStorage(): Promise<Child[]> {
    return this.storage.keys()
    .then(keys => keys.filter(key => key.startsWith('child_')))
    .then((childrenKeys) => {
      const promises = childrenKeys.map((key) => this.storage.get(key));
      return Promise.all(promises)
    })
    .then((childrenData) => childrenData.map((data) => JSON.parse(data)))
  }

  private storeChildren(children: Child[]) {
    const promises = children.map((child) => this.storage.set("child_"+child.id, JSON.stringify(child)))
    Promise.all(promises).then((values) =>{
      console.log("saved:");
      console.log(values);
    }).catch(error => console.log(error));
  }

  private async syncChildren(): Promise<Child[]> {
    // controlla che alcuni non sieno stati eliminati
    let childrenOnServer = await this.http.get<Child[]>(this.APIbaseUrl+"children/").toPromise()
    const children = await this.getChildrenFromStorage();

    children.forEach((storageChild) => {
      childrenOnServer = childrenOnServer.filter((childOnServer) => childOnServer.id != storageChild.id)
    })
    // quelli rimasti nella lista vanno eliminati
    await childrenOnServer.forEach((child) => {
      this.http.delete<Child>(this.APIbaseUrl+`children/${child.id}`)
    })

    children.forEach((child) => this.updateChild(child));
    this.storage.set("user_modified_offline", 'false');
    return children;
  }

  private getChildFromStorage(id): Promise<Child> {
    return this.storage.get(`child_${id}`)
    .then((childData) => JSON.parse(childData))
    .catch((error) => console.log('error retrieving child from storage', error))
  }

  private storeChild(child): Promise<Child> {
    return this.storage.set("child_"+child.id, JSON.stringify(child))
    .then(()=> child)
    .catch(error => console.log(error));
  }

  private deleteChildFromStorage(child): Promise<Child> {
    return this.storage.remove("child_"+child.id)
    .then(()=> child)
    .catch(error => console.log(error));
  }
}