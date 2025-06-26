import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuotationDetailNotesComponent } from './sales-quotation-detail-notes.component';

describe('SalesQuotationDetailNotesComponent', () => {
  let component: SalesQuotationDetailNotesComponent;
  let fixture: ComponentFixture<SalesQuotationDetailNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesQuotationDetailNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesQuotationDetailNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
