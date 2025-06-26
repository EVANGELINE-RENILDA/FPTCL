import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuotationDetailComponent } from './sales-quotation-detail.component';

describe('SalesQuotationDetailComponent', () => {
  let component: SalesQuotationDetailComponent;
  let fixture: ComponentFixture<SalesQuotationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesQuotationDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesQuotationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
