import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Tale } from '../models/tale'

@Injectable()

export class TaleService {

  constructor() {}

  getTales(): Observable<Tale[]> {
    let tales = [
      {
        id: 1,
        title: 'La barzelletta del Fantasma Formaggino',
        sex: 'boy',
        available: true,
        purchase_code_ios: '111222333',
        purchase_code_android: '111222333'
      },
      {
        id: 1,
        title: 'Tutto ha un prezzo',
        sex: 'boy',
        available: false,
        purchase_code_ios: '111222333',
        purchase_code_android: '111222333'
      },
      {
        id: 1,
        title: 'Scalza nella valle dei chiodi',
        sex: 'girl',
        available: true,
        purchase_code_ios: '111222333',
        purchase_code_android: '111222333'
      },
      {
        id: 1,
        title: 'Lo scudetto 84/85',
        sex: 'boy',
        available: true,
        purchase_code_ios: '111222333',
        purchase_code_android: '111222333'
      },
      {
        id: 1,
        title: 'Una lunga storia',
        sex: 'girl',
        available: false,
        purchase_code_ios: '111222333',
        purchase_code_android: '111222333'
      }
    ];

    return Observable.of(tales as Tale[]);
  }

  talePurchased(tale: Tale): Observable<Tale> {
    tale.available = true;
    return Observable.of(tale);
  }

}