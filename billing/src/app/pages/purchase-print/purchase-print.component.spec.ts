import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePrintComponent } from './purchase-print.component';

describe('PurchasePrintComponent', () => {
  let component: PurchasePrintComponent;
  let fixture: ComponentFixture<PurchasePrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchasePrintComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchasePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
