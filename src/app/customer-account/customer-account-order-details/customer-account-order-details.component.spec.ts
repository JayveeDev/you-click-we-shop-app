import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccountOrderDetailsComponent } from './customer-account-order-details.component';

describe('CustomerAccountOrderDetailsComponent', () => {
  let component: CustomerAccountOrderDetailsComponent;
  let fixture: ComponentFixture<CustomerAccountOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAccountOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAccountOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
