import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptTrustEstateSearchComponent } from './receipt-trust-estate-search.component';

describe('ReceiptTrustEstateSearchComponent', () => {
  let component: ReceiptTrustEstateSearchComponent;
  let fixture: ComponentFixture<ReceiptTrustEstateSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptTrustEstateSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptTrustEstateSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
