import { TestBed, inject } from '@angular/core/testing';

import { CryptoCompareService } from './crypto-compare.service';

describe('CryptoCompareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoCompareService]
    });
  });

  it('should be created', inject([CryptoCompareService], (service: CryptoCompareService) => {
    expect(service).toBeTruthy();
  }));
});
