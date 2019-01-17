import { TestBed } from '@angular/core/testing';

import { BillingAddressService } from './billing-address.service';

describe('BillingAddressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillingAddressService = TestBed.get(BillingAddressService);
    expect(service).toBeTruthy();
  });
});
