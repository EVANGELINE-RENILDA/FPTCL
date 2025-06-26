import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptForDeathStep20Component } from './receipt-for-death-step20.component';

describe('ReceiptForDeathStep20Component', () => {
  let component: ReceiptForDeathStep20Component;
  let fixture: ComponentFixture<ReceiptForDeathStep20Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptForDeathStep20Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptForDeathStep20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
