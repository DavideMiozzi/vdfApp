import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { Tale } from '../models/tale'

import { NetworkService } from '../providers';

@Injectable()

export class TaleService {

  readonly APIbaseUrl = 'http://localhost:3000/v1/';

  constructor(private http: HttpClient, private storage: Storage) {}

  getTales(): Promise<Tale[]> {
    return this.http.get<Tale[]>(this.APIbaseUrl+"tales/")
    .toPromise()
    .catch((error) => { 
      console.log('error retrieving tales from server', error)
      return []
    })
  }

  getTale(taleId): Promise<Tale> {
    return this.http.get<Tale>(this.APIbaseUrl+"tales/"+taleId)
    .toPromise()
    .catch((error) => { 
      console.log('error retrieving tale from server', error)
      return null
    })
  }

  talePurchased(tale: Tale): Observable<Tale> {
    tale.available = true;
    return Observable.of(tale);
  }

}