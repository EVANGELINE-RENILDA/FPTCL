import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuotationSearchComponent } from './sales-quotation-search.component';

describe('SalesQuotationSearchComponent', () => {
  let component: SalesQuotationSearchComponent;
  let fixture: ComponentFixture<SalesQuotationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesQuotationSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesQuotationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
