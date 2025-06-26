import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptForSecurityStep7Component } from './receipt-for-security-step7.component';

describe('ReceiptForSecurityStep7Component', () => {
  let component: ReceiptForSecurityStep7Component;
  let fixture: ComponentFixture<ReceiptForSecurityStep7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptForSecurityStep7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptForSecurityStep7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
