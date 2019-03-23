import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { Tale } from '../models/tale'

import { NetworkService } from '../providers';

import * as Constants from '../constants';
import { Scene } from '../models/scene';

@Injectable()

export class TaleService {

  readonly APIbaseUrl = Constants.API_ENDPOINT_V;

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
    .then(obj => {
      let tale = Object.assign(new Tale(), obj)
      tale.scenes = []
      obj.scenes.forEach( scene => {
        if (scene.style.substring(0, 1) == "{") /*++++++++++++ PEZZA I DATI VANNO SISTEMATI SU SERVER */
          scene.style = JSON.parse(scene.style);
        else
          scene.style = JSON.parse("{"+scene.style+"}");
        let sceneObj = new Scene(scene.text, scene.number, scene.style, scene.option_a_dest, scene.option_b_dest);
        tale.scenes.push(sceneObj);
      })
      return tale
    })
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