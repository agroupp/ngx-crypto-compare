import { Injectable, Inject } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { CcResponse } from './cc-response.class';
import { CcMarketSubscription, MARKET_SUBSCRIPTION_TYPES } from './cc-market-subscription.class';

@Injectable()
export class CryptoCompareService {
  socket: any;

  constructor(@Inject('API_URL') private apiUrl: string) {}

  /**
   * Connects to API and returns observable of CcResponse objects
   * @param subsciptions
   */
  connect(subsciptions: CcMarketSubscription): Observable<any>;
  connect(subscriptions: Array<CcMarketSubscription>): Observable<any>;
  connect(subscriptions: any): Observable<any> {
    let subs: Array<CcMarketSubscription> = [];
    if (!Array.isArray(subscriptions)) {
      subs.push(subscriptions);
    } else {
      subs = subscriptions;
    }
    return Observable.create((observer: Observer<any>) => {
      this.socket = io(this.apiUrl);
      this.subscribeToMarketData(subs);
      this.socket.on('m', (message: string) => {
        const messageType =  +message.substring(0, message.indexOf('~'));
        if (Array.from(MARKET_SUBSCRIPTION_TYPES.values()).indexOf(messageType) > -1) {
          observer.next(new CcResponse(message));
        }
      });
    });
  }

  /**
   * Subscribes to market data by emitting 'SubAdd'
   * including a list of items you want to get updates on.
   * @param subscriptions
   */
  private subscribeToMarketData(subscriptions: Array<CcMarketSubscription>): void {
    if (this.socket) {
      this.socket.emit('SubAdd', {subs: subscriptions.map(s => s.packed)});
    }
  }
}
