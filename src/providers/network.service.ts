import { Injectable } from '@angular/core';

import { Network } from '@ionic-native/network';

@Injectable()

export class NetworkService {

  constructor(private network: Network) {}

  isConnected(): boolean {
    /*
    let conntype = this.network.type;
    return conntype && conntype !== 'unknown' && conntype !== 'none';
    */
    return true;
  }

}