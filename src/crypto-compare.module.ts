import { NgModule } from '@angular/core';

import { CryptoCompareService } from './crypto-compare.service';

@NgModule({
  providers: [
    CryptoCompareService,
    {provide: 'API_URL', useValue: 'https://streamer.cryptocompare.com/'}
  ]
})
export class CryptoCompareModule { }
