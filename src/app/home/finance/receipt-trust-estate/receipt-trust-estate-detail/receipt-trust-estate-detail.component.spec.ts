import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptTrustEstateDetailComponent } from './receipt-trust-estate-detail.component';

describe('ReceiptTrustEstateDetailComponent', () => {
  let component: ReceiptTrustEstateDetailComponent;
  let fixture: ComponentFixture<ReceiptTrustEstateDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptTrustEstateDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptTrustEstateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
