import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRecieptComponent } from './supplier-reciept.component';

describe('SupplierRecieptComponent', () => {
  let component: SupplierRecieptComponent;
  let fixture: ComponentFixture<SupplierRecieptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierRecieptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierRecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
