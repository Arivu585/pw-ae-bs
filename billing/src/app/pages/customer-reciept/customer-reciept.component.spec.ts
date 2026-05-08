import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRecieptComponent } from './customer-reciept.component';

describe('CustomerRecieptComponent', () => {
  let component: CustomerRecieptComponent;
  let fixture: ComponentFixture<CustomerRecieptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerRecieptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerRecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
