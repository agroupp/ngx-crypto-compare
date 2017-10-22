# ngx-crypto-compare

An Angular service to get real time data from [Crypto Compare API](https://www.cryptocompare.com/).
I got this idea after watching [this](https://www.youtube.com/watch?v=gs5IZG-K02Q) great video.

## Usage

```typescript
    import { CryptoCompareModule } from 'ngx-crypto-compare';
    ...

    import { CryptoCompareService, CcMarketSubscription, CcResponse } from 'crypto-compare';
    ...
    marketData$: Observable<CcResponse>;
    constructor(private cc: CryptoCompareService) {}

    ...
    
    this.marketData$ = this.cc.connect(new CcMarketSubscription({
      subscriptionType: 'Current', exchangeName: 'Coinbase',
      fromSymbol: 'BTC', toSymbol: 'USD'
    }));
    ...
```
In ```marketData$``` you get ```Observable``` with the type ```CcResponse```.

## Feedback

Any feedback and stars appreciated :smile:
