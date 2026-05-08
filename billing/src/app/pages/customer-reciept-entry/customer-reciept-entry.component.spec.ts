import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRecieptEntryComponent } from './customer-reciept-entry.component';

describe('CustomerRecieptEntryComponent', () => {
  let component: CustomerRecieptEntryComponent;
  let fixture: ComponentFixture<CustomerRecieptEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerRecieptEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerRecieptEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
